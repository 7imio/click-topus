// texture/WorldMapTexture.ts
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as d3 from 'd3-geo';
import worldMap from '../../../../../data/worldMap.json';
import { getCountriesWithColors } from '../../../../../helpers/globe-utils';
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from 'geojson';

const canvasSize = 2048;

const canvasWidth = canvasSize * 1.5;
const canvasHeight = canvasSize;

const geoData = worldMap as FeatureCollection<Geometry>;

export const useDynamicWorldTexture = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  if (!canvasRef.current) {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvasRef.current = canvas;

    textureRef.current = new THREE.CanvasTexture(canvas);
  }

  const fillWaterColor = (
    ctx: CanvasRenderingContext2D,
    centerColor: string,
    borderColor: string
  ) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      0,
      canvasWidth / 2,
      canvasHeight / 2,
      canvasWidth / 2
    );

    gradient.addColorStop(0, centerColor);
    gradient.addColorStop(1, borderColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const drawMap = () => {
    const ctx = canvasRef.current!.getContext('2d')!;

    const centerColor = '#55774F';
    const borderColor = '#111D29';

    fillWaterColor(ctx, centerColor, borderColor);
    const countries = getCountriesWithColors();

    const projection = d3.geoNaturalEarth1().fitExtent(
      [
        [0, 0],
        [canvasWidth, canvasHeight],
      ],
      geoData
    );

    const path = d3.geoPath(projection, ctx);

    geoData.features.forEach((feature: Feature<Geometry, GeoJsonProperties>) =>
      fillCountryColor(feature, countries, ctx, path)
    );
    textureRef.current!.needsUpdate = true;
  };

  const fillCountryColor = (
    feature: Feature<Geometry, GeoJsonProperties>,
    countries: any[],
    ctx: CanvasRenderingContext2D,
    path: d3.GeoPath<any, d3.GeoPermissibleObjects>
  ) => {
    if (!feature.properties) return;
    const isoCode = feature.properties.iso_a2_eh;
    const countryData = countries.find((c) => c.ISO_A2 === isoCode);

    if (!countryData) return;

    ctx.fillStyle = countryData.color || '#444';
    ctx.beginPath();
    path(feature);
    ctx.fill();
  };

  useEffect(() => {
    drawMap();
  }, []);

  return textureRef.current!;
};

// texture/WorldMapTexture.ts
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as d3 from 'd3-geo';
import worldMap from '../../../../../data/worldMap.json';
import { getCountriesWithColors } from '../../../../../helpers/globe-utils';
import { FeatureCollection, Geometry } from 'geojson';

const canvasSize = 4096;

const geoData = worldMap as FeatureCollection<Geometry>;

export const useDynamicWorldTexture = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);

  if (!canvasRef.current) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = canvasSize;
    canvasRef.current = canvas;
    textureRef.current = new THREE.CanvasTexture(canvas);
  }

  const drawMap = () => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    const countries = getCountriesWithColors();

    // const projection = d3
    //   .geoEquirectangular()
    //   .fitSize([canvasSize, canvasSize], geoData);

    const projection = d3.geoEquirectangular().fitExtent(
      [
        [0, 0],
        [canvasSize, canvasSize],
      ],
      {
        ...geoData,
        bbox: [-180, -180, 180, 180],
      }
    );
    const path = d3.geoPath(projection, ctx);

    geoData.features.forEach((feature: any) => {
      const isoCode = feature.properties.iso_a2_eh;
      const countryData = countries.find((c) => c.ISO_A2 === isoCode);

      if (!countryData) return;

      ctx.fillStyle = countryData.color || '#444';
      ctx.beginPath();
      path(feature);
      ctx.fill();
    });

    textureRef.current!.needsUpdate = true;
  };

  useEffect(() => {
    drawMap();
  }, []);

  return textureRef.current!;
};

import { useEffect, useState } from 'react';
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
import { useAppSelector } from '../../../../../store/hooks';

const canvasSize = 2048;
const canvasWidth = canvasSize * 1.6;
const canvasHeight = canvasSize;
const geoData = worldMap as FeatureCollection<Geometry>;

export const useDynamicWorldTexture = () => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  const { countries: countriesData } = useAppSelector(
    (state) => state.countries
  );

  useEffect(() => {
    const generateTexture = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d')!;

      fillWaterColor(ctx, '#55774F', '#111D29');
      const countries = getCountriesWithColors(countriesData);

      const projection = d3.geoNaturalEarth1().fitExtent(
        [
          [0, 0],
          [canvasWidth, canvasHeight],
        ],
        geoData
      );

      const path = d3.geoPath(projection, ctx);

      geoData.features.forEach(
        (feature: Feature<Geometry, GeoJsonProperties>) => {
          fillCountryColor(feature, countries, ctx, path);
        }
      );

      const texture = new THREE.CanvasTexture(canvas);
      texture.offset.set(0, 0);
      texture.repeat.set(1, 1);
      texture.needsUpdate = true;

      setTexture(texture);
    };

    generateTexture();
  }, []);

  return texture;
};

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

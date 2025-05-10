import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect } from 'react';
import { Country } from '../../types/Country';

import countries from '../../data/countries/coutriesData.json';

const countryData: Country[] = countries.map((c) => ({
  ...c,
  defensePotential: Number(c.defensePotential),
}));

const WorldConquestMap = () => {
  useEffect(() => {
    const root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'], // Exclude Antarctica
      })
    );

    const getColorByPotential = (potential: number) => {
      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);
      const factor = clamp(potential, 0, 100) / 100;

      const startColor = { r: 0x10, g: 0xb9, b: 0x81 }; // Vert abysse (0x10b981)
      const endColor = { r: 0x99, g: 0x1b, b: 0x1b }; // Rouge sombre (0x991b1b)

      const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);

      return am5.color((r << 16) + (g << 8) + b);
    };

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
    });

    // Lors du clic, simple log des infos du pays
    polygonSeries.mapPolygons.template.events.on('click', (ev) => {
      const country = ev.target.dataItem.dataContext;

      console.log(`Clicked on: ${country.name} (${country.id})`, { country });
    });

    // Coloration dynamique basée sur ton JSON de data
    polygonSeries.events.on('datavalidated', () => {
      polygonSeries.mapPolygons.each((polygon) => {
        const countryISO = polygon.dataItem.dataContext.id;
        const countryInfo = countryData.find((c) => c.ISO_A2 === countryISO);

        if (countryInfo) {
          polygon.set(
            'fill',
            getColorByPotential(countryInfo.defensePotential)
          );
        } else {
          polygon.set('fill', am5.color(0x374151)); // Couleur neutre si non trouvé
        }
      });
    });

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '100vh' }} />;
};

export default WorldConquestMap;

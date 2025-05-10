import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect } from 'react';
import { getColorByPotential } from './MapUtils';
import { useCountryData } from './MapDataProcessor';

const MapRenderer = () => {
  const countryData = useCountryData();

  useEffect(() => {
    if (countryData) console.log(countryData);
    const root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
    });

    polygonSeries.mapPolygons.template.events.on('click', (ev) => {
      const dataItem = ev.target.dataItem;
      if (dataItem) {
        const country = dataItem.dataContext as { id: string; name?: string };
        console.log(`Clicked on: ${country.name} (${country.id})`, { country });
      }
    });

    polygonSeries.events.on('datavalidated', () => {
      polygonSeries.mapPolygons.each((polygon) => {
        if (!polygon.dataItem) return;
        const dataContext = polygon.dataItem.dataContext as {
          id: string;
          name?: string;
        };
        const countryISO = dataContext.id;
        const countryInfo = countryData.find((c) => c.ISO_A2 === countryISO);

        polygon.set(
          'fill',
          countryInfo
            ? getColorByPotential(countryInfo.defensePotential)
            : am5.color(0x374151)
        );
      });
    });

    return () => root.dispose();
  }, [countryData]);

  return <div id="chartdiv" style={{ width: '100%', height: '100%' }} />;
};

export default MapRenderer;

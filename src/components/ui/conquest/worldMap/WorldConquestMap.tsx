import MapRenderer from './MapRenderer';
import MapTooltip from './MapTooltip';

const WorldConquestMap = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <MapRenderer />
      <MapTooltip />
    </div>
  );
};

export default WorldConquestMap;

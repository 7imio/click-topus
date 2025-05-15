import WorldConquestMap from './worldMap/WorldConquestMap';

const ConquestScreen = () => {
  // return <p>coming soon</p>;
  return (
    <div className="flex flex-col items-center justify-center text-white gap-5 w-full h-full p-6">
      <h1 className="text-2xl font-bold mb-4">🗺️ World Conquest</h1>
      <WorldConquestMap />
      <p>lorem ipsum</p>
    </div>
  );
};

export default ConquestScreen;

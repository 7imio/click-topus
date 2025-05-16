import CountryConquestList from './CountryConquestList';
import Globe from './Globe';

const WorldConquestMap = () => {
  return (
    <div>
      <div className="z-100 flex flex-col items-center justify-center w-[100vw] h-[300px] sm:h-[500px] md:h-[600px] border-2 border-green-500 rounded-lg relative">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-lg" />
        <div className="relative z-10 w-full h-full">
          <Globe />
        </div>
      </div>
      <CountryConquestList />
    </div>
  );
};

export default WorldConquestMap;

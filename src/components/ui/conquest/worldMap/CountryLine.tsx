import { FC } from 'react';
import { Country } from '../../../../types/Country';
import ProgressBar from '../../ProgressBar';
import { useNavigate } from 'react-router-dom';

interface CountryLineProps {
  country: Country;
}

const CountryLine: FC<CountryLineProps> = ({ country }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/conquest/${country.ISO_A2}`)}
      className="flex justify-between items-center p-2 border-2 border-green-600 bg-green-900 hover:bg-green-800 text-green-100 rounded-lg shadow-md cursor-pointer transition-all duration-200 w-full"
    >
      <div className="flex flex-row gap-1 justify-between items-center w-2/3">
        <span className="text-xl font-bold">{country.name}</span>
        <div className="flex flex-row gap-2 text-sm text-green-300 mr-10">
          <span className="ml-1">Defense: {country.defensePotential}</span>
          <span className="ml-1">
            Population: {country.population.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="w-1/3">
        <ProgressBar
          indoctrinationLevel={country.indoctrinationLevel}
          population={country.population}
        />
      </div>
    </div>
  );
};

export default CountryLine;

import { FC } from 'react';
import { Country } from '../../../../types/Country';
import ProgressBar from '../../ProgressBar';

interface CountryLineProps {
  country: Country;
  onClick: (country: Country) => void;
}

const CountryLine: FC<CountryLineProps> = ({ country, onClick }) => {
  return (
    <div
      onClick={() => onClick(country)}
      className="flex justify-between items-center p-2 border-2 border-green-600 bg-green-900 hover:bg-green-800 text-green-100 rounded-lg shadow-md cursor-pointer transition-all duration-200 w-full"
    >
      <div className="flex flex-row gap-1">
        <span className="text-xl font-bold">{country.name}</span>
        <span>Defense: {country.defensePotential}</span>
        <span>Population: {country.population.toLocaleString()}</span>
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

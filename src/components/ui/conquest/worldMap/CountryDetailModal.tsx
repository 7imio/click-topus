import { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../ProgressBar';
import { Country } from '../../../../types/Country';

interface CountryDetailsModalProps {
  country: Country;
}

const CountryDetailsModal: FC<CountryDetailsModalProps> = ({ country }) => {
  const navigate = useNavigate();

  return (
    <div className="text-green-100">
      <h2 className="text-2xl font-bold mb-4">{country.name}</h2>
      <p>Defense Level: {country.defensePotential}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Capacities: {country.capacities.map((cap) => cap.name).join(', ')}</p>

      <div className="my-4">
        <ProgressBar
          indoctrinationLevel={country.indoctrinationLevel}
          population={country.population}
        />
      </div>

      <button
        onClick={() => navigate(`/conquest/${country.ISO_A2}`)}
        className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold"
      >
        ⚔️ Launch Conquest
      </button>
    </div>
  );
};

export default CountryDetailsModal;

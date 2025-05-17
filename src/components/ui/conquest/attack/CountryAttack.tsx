import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Creature } from '../../../../types/Creature';
import OctopodeLine from '../../offsprings/OctopodeLine';
import ProgressBar from '../../ProgressBar';
import SkillCompatibilities from './SkillCompatibilities';
import Pagination from '../../../generics/Pagination';
import { buyFervorItem } from '../../../../store/slices/fervorSlice';
import { useSendOctopodeToConquest } from '../../../../hooks/useSendOctopodeToConquest';

const ITEMS_PER_PAGE = 5;

const CountryAttack = () => {
  const { ISO_A2 } = useParams<{ ISO_A2: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sendOctopodeToConquest = useSendOctopodeToConquest();

  const { fervor, currentCost } = useAppSelector((state) => state.fervor);

  const country = useAppSelector((state) =>
    state.countries.countries.find((c) => c.ISO_A2 === ISO_A2)
  );

  const availableOctopodes = useAppSelector((state) =>
    (state.creatures.creatures ?? []).filter(
      (c) => c.canConquest && !c.isDead && !c.isInConquest
    )
  );

  const [selectedOctopode, setSelectedOctopode] = useState<Creature | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(availableOctopodes.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = availableOctopodes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (!country) {
    return <p className="text-center text-red-500">Country not found!</p>;
  }

  const handleLaunchAttack = () => {
    if (!selectedOctopode) return;
    if (selectedOctopode.isInConquest) return;
    if (fervor < currentCost) return;

    dispatch(
      buyFervorItem({ name: `Attack ${country.name}`, cost: currentCost })
    );
    sendOctopodeToConquest(selectedOctopode, country);
  };

  return (
    <div className="flex flex-col items-center p-1 text-green-200">
      <h1 className="text-2xl font-bold mb-2">⚔️ Attack {country.name}</h1>
      <h2 className="text-xl font-bold mb-1">🔥 Fervor : {fervor}</h2>
      <div className="flex flex-row items-center mb-2 gap-2 ">
        <p>Defense Level: {country.defensePotential}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>
          Capacities:{' '}
          {country.capacities.map((cap) => cap.name).join(', ') || 'None'}
        </p>
      </div>
      <div className="w-full my-4">
        <ProgressBar
          population={country.population}
          indoctrinationLevel={country.indoctrinationLevel}
        />
      </div>

      <h2 className="text-2xl font-bold mt-1 mb-1">Select Your Octopode</h2>

      <div className="flex flex-col w-full mb-1">
        {currentItems.map((octo) => (
          <div
            key={octo.creatureId}
            className={`cursor-pointer ${selectedOctopode?.creatureId === octo.creatureId ? 'text-xl' : ''}`}
            onClick={() => setSelectedOctopode(octo)}
          >
            <OctopodeLine creature={octo} disableClick />
          </div>
        ))}

        {availableOctopodes.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {selectedOctopode ? (
        <SkillCompatibilities
          country={country}
          octopode={selectedOctopode}
          onLaunchAttack={handleLaunchAttack}
          onBack={() => navigate('/conquest')}
        />
      ) : (
        <button
          onClick={() => navigate('/conquest')}
          className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full"
        >
          🔙 Back to Conquest Panel
        </button>
      )}
    </div>
  );
};

export default CountryAttack;

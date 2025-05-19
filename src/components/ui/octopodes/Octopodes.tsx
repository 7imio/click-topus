import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import Pagination from '../../generics/Pagination';
import { Creature } from '../../../types/Creature';
import OctopodeLine from './OctopodeLine';
import Modal from '../../generics/Modal';
import { addFervor } from '../../../store/slices/fervorSlice';
import { farewellCreature as farewellCreatureAction } from '../../../store/slices/creatureSlice';

const Octopodes = () => {
  const { creatures } = useAppSelector((state) => state.creatures);
  const { countries } = useAppSelector((state) => state.countries);

  const dispatch = useAppDispatch();

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Creature>('creatureName');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const [currentItems, setCurrentItems] = useState<Creature[]>([]);

  const [farewellModal, setFarewellModal] = useState<boolean>(false);
  const [farewellCreature, setFarewellCreature] = useState<Creature>();

  const handleSort = (key: keyof Creature) => setSortKey(key);

  const handleFarewell = (creatureId: string) => {
    setFarewellCreature(creatures?.find((c) => c.creatureId === creatureId));
    setFarewellModal(true);
  };
  const handleFarewellCloseModal = () => {
    setFarewellCreature(undefined);
    setFarewellModal(false);
  };

  useEffect(() => {
    if (!creatures) return;
    const sorted = [...creatures].sort((a, b) => {
      if (typeof a[sortKey] === 'string') {
        return (a[sortKey] as string).localeCompare(b[sortKey] as string);
      }
      return (b[sortKey] as number) - (a[sortKey] as number);
    });

    setCurrentItems(sorted.slice(startIndex, startIndex + itemsPerPage));
  }, [creatures, startIndex, sortKey]);

  return currentItems.length > 0 ? (
    <>
      <Modal isOpen={farewellModal} onClose={handleFarewellCloseModal}>
        {farewellCreature && (
          <div className="flex flex-col items-center text-center p-4">
            <p className="text-lg font-semibold mb-2">
              Say goodbye to <span className="text-red-400">{farewellCreature.creatureName}</span>?
            </p>
            <p className="text-sm text-gray-400">
              Born on {new Date(farewellCreature.birthDate).toLocaleDateString()}, died on{' '}
              {farewellCreature.deathDate ? new Date(farewellCreature.deathDate).toLocaleDateString() : 'Unknown'}
            </p>

            {farewellCreature.lastConquestTarget &&
              countries.find((c) => c.ISO_A2 === farewellCreature.lastConquestTarget) && (
                <p className="text-sm text-gray-400 mt-2">
                  Last seen during the conquest of{' '}
                  <span className="text-green-300">
                    {countries.find((c) => c.ISO_A2 === farewellCreature.lastConquestTarget)?.name}
                  </span>
                  .
                </p>
              )}

            <p className="mt-4 text-green-300 text-md">
              They will return <span className="font-bold">{Math.floor(farewellCreature.maxEssence / 2)}</span> Fervor
              to aid the cause.
            </p>

            <div className="flex gap-4 mt-6">
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded shadow-sm transition-all duration-200"
                onClick={() => {
                  // Dispatch logique du farewell ici
                  dispatch(addFervor(Math.floor(farewellCreature.maxEssence / 2)));
                  dispatch(farewellCreatureAction({ creatureId: farewellCreature.creatureId }));
                  handleFarewellCloseModal();
                }}
              >
                🕯️ Confirm Farewell
              </button>

              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-sm transition-all duration-200"
                onClick={handleFarewellCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
      <div className="flex flex-col gap-4 p-4 w-full">
        <div className="flex justify-center gap-4 mb-4">
          <button
            className="flex border-2 p-2 border-green-500 rounded-lg bg-green-900 text-green-200 hover:bg-green-800 transition-all duration-200"
            onClick={() => handleSort('creatureName')}
          >
            Sort by Name
          </button>
          <button
            className="flex border-2 p-2 border-green-500 rounded-lg bg-green-900 text-green-200 hover:bg-green-800 transition-all duration-200"
            onClick={() => handleSort('essence')}
          >
            Sort by Essence
          </button>
          <button
            className="flex border-2 p-2 border-green-500 rounded-lg bg-green-900 text-green-200 hover:bg-green-800 transition-all duration-200"
            onClick={() => handleSort('skills')}
          >
            Sort by Skills
          </button>
          <button
            className="flex border-2 p-2 border-green-500 rounded-lg bg-green-900 text-green-200 hover:bg-green-800 transition-all duration-200"
            onClick={() => handleSort('canConquest')}
          >
            Sort by Status
          </button>
        </div>

        <div className="flex flex-col">
          {currentItems.map((c) => (
            <OctopodeLine key={c.creatureId} creature={c} onFarewell={handleFarewell} />
          ))}
        </div>

        {creatures && Math.ceil(creatures.length / itemsPerPage) > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(creatures.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  ) : (
    <p className="text-center text-green-300 mt-10">No creatures have been summoned yet.</p>
  );
};

export default Octopodes;

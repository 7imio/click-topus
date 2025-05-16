import { useAppSelector } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import Pagination from '../../generics/Pagination';
import { Creature } from '../../../types/Creature';
import OctopodeLine from './OctopodeLine';

const Octopodes = () => {
  const { creatures } = useAppSelector((state) => state.creatures);
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Creature>('creatureName');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const [currentItems, setCurrentItems] = useState<Creature[]>([]);

  const handleSort = (key: keyof Creature) => setSortKey(key);

  const handleFarewell = (creatureId: string) => {
    console.log(`Farewell to ${creatureId} (trigger slice here)`);
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
          <OctopodeLine
            key={c.creatureId}
            creature={c}
            onFarewell={handleFarewell}
          />
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
  ) : (
    <p className="text-center text-green-300 mt-10">
      No creatures have been summoned yet.
    </p>
  );
};

export default Octopodes;

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import Eye from '../../creatures/Eye';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';

const Octopodes = () => {
  const { creatures } = useAppSelector((state) => state.creatures);

  const itemsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = creatures?.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (!creatures) return;
    setTotalPages(Math.ceil(creatures.length / itemsPerPage));
  }, [creatures]);

  return currentItems && currentItems.length > 0 ? (
    <div className="flex flex-col justify-evenly">
      <div className="flex flex-wrap gap-4 justify-center p-4">
        {currentItems.map((c) => (
          <>
            <Link
              key={c.creatureId}
              to={`/octopodes/${c.creatureId}`}
              className="flex self-center justify-center align-middle items-center gap-2 p-4 bg-green-900 hover:bg-green-700 text-green-100 rounded-lg shadow-md transition-all duration-200"
            >
              <Eye skin={c.skin} disablePopEffect={true} miniEye={true} />
              <span className="text-shadow-neutral-900 text-shadow-md">
                {c.creatureName}
              </span>
            </Link>
          </>
        ))}
      </div>
      {totalPages && totalPages > 1 && (
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  ) : (
    <p className="text-center text-green-300 mt-10">
      No creatures have been summoned yet.
    </p>
  );
};

export default Octopodes;

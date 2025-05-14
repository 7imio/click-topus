import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToFirst = () => onPageChange(1);
  const goToLast = () => onPageChange(totalPages);
  const goToPrev = () => onPageChange(currentPage - 1);
  const goToNext = () => onPageChange(currentPage + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* First Page */}
      <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        onClick={goToFirst}
        disabled={currentPage === 1}
      >
        First
      </button>

      {/* Previous */}
      <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        onClick={goToPrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Current Page Indicator */}
      <span className="px-4 py-1 bg-emerald-600 text-white rounded">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        onClick={goToNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      {/* Last Page */}
      <button
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        onClick={goToLast}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;

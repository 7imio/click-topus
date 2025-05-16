import { FC, useState } from 'react';
import useConquestCountries from '../../../../hooks/useConquestCountries';
import Pagination from '../../../generics/Pagination';
import CountryLine from './CountryLine';

const CountryConquestList: FC = () => {
  const countries = useConquestCountries();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = countries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <div className="flex flex-col">
        {currentItems.map((country) => (
          <CountryLine
            key={`line-country-${country.ISO_A2}`}
            country={country}
          />
        ))}
      </div>

      {countries.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countries.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CountryConquestList;

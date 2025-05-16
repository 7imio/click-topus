import { FC, useState } from 'react';
import useConquestCountries from '../../../../hooks/useConquestCountries';
import { Country } from '../../../../types/Country';
import Pagination from '../../../generics/Pagination';
import CountryDetailsModal from './CountryDetailModal';
import Modal from '../../../generics/Modal';
import CountryLine from './CountryLine';

const CountryConquestList: FC = () => {
  const countries = useConquestCountries();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = countries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <div className="flex flex-col">
        {currentItems.map((country) => (
          <CountryLine
            key={country.ISO_A2}
            country={country}
            onClick={setSelectedCountry}
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

      <Modal
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
      >
        {selectedCountry && <CountryDetailsModal country={selectedCountry} />}
      </Modal>
    </div>
  );
};

export default CountryConquestList;

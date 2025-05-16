import useConquestCountries from '../../../../hooks/useConquestCountries';
import ProgressBar from '../../ProgressBar';

const CountryConquestList = () => {
  const countries = useConquestCountries();

  if (!countries.length)
    return (
      <p className="text-green-400 text-center">
        No current conquests underway.
      </p>
    );

  return (
    <div className="space-y-2">
      {countries.map((country) => (
        <div
          key={country.ISO_A3}
          className="flex justify-between items-center bg-green-900/80 p-2 rounded-lg"
        >
          <span>{country.name}</span>
          <ProgressBar value={country.indoctrinationLevelPercentage} />
        </div>
      ))}
    </div>
  );
};

export default CountryConquestList;

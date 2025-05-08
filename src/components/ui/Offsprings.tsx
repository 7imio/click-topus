import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const Offsprings = () => {
  const { creatures } = useAppSelector((state) => state.creatures);

  return (
    <ul>
      {creatures?.map((c) => {
        return (
          <Link key={c.creatureId} to={`/offsprings/${c.creatureId}`}>
            <li>
              {c.creatureName} - {c.essence}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Offsprings;

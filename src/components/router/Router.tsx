import { Route, Routes } from 'react-router-dom';
import Abyss from '../main/Abyss';
import { FC } from 'react';
import StartScreen from '../ui/StartScreen';
import ResetScreen from '../ui/ResetScreen';
import About from '../ui/About';
import Informations from '../ui/Informations';
import Offsprings from '../ui/Offsprings';
import OffspringDetails from '../ui/OffspringDetails';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<Abyss />} />
      <Route path="/about" element={<About />} />
      <Route path="/info" element={<Informations />} />
      <Route path="/conquest" element={<p>Coming soon</p>} />
      <Route path="/reset" element={<ResetScreen />} />
      <Route path="/offsprings" element={<Offsprings />} />
      <Route path="/offsprings/:creatureId" element={<OffspringDetails />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
};

export default Router;

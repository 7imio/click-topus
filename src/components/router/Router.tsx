import { Route, Routes } from 'react-router-dom';
import Abyss from '../main/Abyss';
import { FC } from 'react';
import StartScreen from '../ui/menu/StartScreen';
import ResetScreen from '../ui/menu/ResetScreen';
import About from '../ui/menu/About';
import Informations from '../ui/menu/Informations';
import Octopodes from '../ui/offsprings/Octopodes';
import OctopodeDetails from '../ui/offsprings/OctopodeDetails';
import ConquestScreen from '../ui/conquest/ConquestScreen';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<Abyss />} />
      <Route path="/about" element={<About />} />
      <Route path="/info" element={<Informations />} />
      <Route path="/conquest" element={<ConquestScreen />} />
      <Route path="/reset" element={<ResetScreen />} />
      <Route path="/octopodes" element={<Octopodes />} />
      <Route path="/octopodes/:creatureId" element={<OctopodeDetails />} />
      <Route path="/test" element={<p>Testing route</p>} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
};

export default Router;

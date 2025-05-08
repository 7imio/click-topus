import { Route, Routes } from 'react-router-dom';
import Abyss from '../main/Abyss';
import { FC } from 'react';
import StartScreen from '../ui/StartScreen';
import ResetScreen from '../ui/ResetScreen';
import Informations from '../ui/Informations';
import About from '../ui/About';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<Abyss />} />
      <Route path="/about" element={<About />} />
      <Route path="/infos" element={<Informations />} />
      <Route path="/conquest" element={<p>Coming soon</p>} />
      <Route path="/reset" element={<ResetScreen />} />
    </Routes>
  );
};

export default Router;

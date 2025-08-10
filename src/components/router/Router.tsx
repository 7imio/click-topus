import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import RedirectToError from '../error/RedirectToError';
import Abyss from '../main/Abyss';
import CountryAttack from '../ui/conquest/attack/CountryAttack';
import ConquestScreen from '../ui/conquest/ConquestScreen';
import About from '../ui/menu/About';
import Informations from '../ui/menu/Informations';
import ResetScreen from '../ui/menu/ResetScreen';
import StartScreen from '../ui/menu/StartScreen';
import OctopodeDetails from '../ui/octopodes/OctopodeDetails';
import Octopodes from '../ui/octopodes/Octopodes';
import OctopodeSkillSelector from '../ui/octopodes/OctopodeSkillSelector';
import Thanks from '../ui/Thanks';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/game" element={<Abyss />} />
      <Route path="/about" element={<About />} />
      <Route path="/info" element={<Informations />} />
      <Route path="/reset" element={<ResetScreen />} />
      <Route path="/thanks" element={<Thanks />} />

      <Route path="/conquest" element={<ConquestScreen />} />
      <Route path="/conquest/:ISO_A2" element={<CountryAttack />} />

      <Route path="/octopodes" element={<Octopodes />} />
      <Route path="/octopodes/:creatureId" element={<OctopodeDetails />} />
      <Route path="/octopodes/:creatureId/skills" element={<OctopodeSkillSelector />} />

      <Route path="/octopodes/:creatureId/level/" element={
        <div className="text-white">
          octopode status page with level up logic, coming soon...
        </div>
      } />
      <Route path='/octopodes/merge' element=
        {
          <div className="text-white">
            Merge adults octopods to make a stronger new one
          </div>

        } />
      <Route
        path="/memoriam"
        element={
          <div className="text-white">
            Octopod cemetary, to honor dead ones
          </div>
        }
      />
      <Route
        path="/*"
        element={
          <RedirectToError errorStatus={404} errorMessage="page not Found." />
        }
      />
    </Routes>
  );
};

export default Router;

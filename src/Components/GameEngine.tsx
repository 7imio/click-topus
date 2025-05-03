import { FC } from 'react';
import useAutoClickers from '../Hooks/useAutoClickers';

const GameEngine: FC = () => {
  useAutoClickers();
  return null;
};

export default GameEngine;

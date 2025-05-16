import { FC, useState } from 'react';
import Globe from './Globe';
import CountryConquestList from './CountryConquestList';
import Modal from '../../../generics/Modal';

const WorldConquestMap: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full items-center bg-gradient-to-b from-green-900 to-gray-900">
      {/* Titre */}
      <h1 className="text-3xl text-white font-bold mt-2 mb-2">
        🌍 World Conquest
      </h1>

      <div className="z-100 flex flex-col items-center justify-center w-[100vw] h-[300px] sm:h-[500px] md:h-[600px] border-2 border-green-500 rounded-lg relative">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-lg" />
        <div className="relative z-10 w-full h-full">
          <Globe />
        </div>
      </div>

      {/* Liste des pays en conquête */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          🌐 Active Conquests
        </h2>
        <CountryConquestList />
      </Modal>

      {/* Navigation */}
      <div className="w-full flex justify-center mt-6 mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="ml-4 px-8 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-lg font-bold rounded-full shadow-md animate-glow"
        >
          🌍 Active Conquests
        </button>
      </div>
    </div>
  );
};

export default WorldConquestMap;

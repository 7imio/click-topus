import { Link } from 'react-router-dom';

const StartScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <h1 className="w-full text-center text-4xl md:text-7xl font-extrabold text-green-300 drop-shadow-lg mb-8 tracking-widest animate-pulse">
        Eldritch Clicker
      </h1>

      <Link to="/game">
        <button className="bg-emerald-700 text-green-100 font-bold py-3 px-6 rounded-2xl text-xl shadow-md transition-all duration-300 animate-glow hover:bg-emerald-600 hover:scale-105">
          Click here to enter the void
        </button>
      </Link>
    </div>
  );
};

export default StartScreen;

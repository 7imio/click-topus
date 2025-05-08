import { FC } from 'react';

const About: FC = () => {
  return (
    <div className="text-green-200 rounded-3xl p-6 text-center flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold text-green-400">
        👁️ About Eldritch Clicker 👁️
      </h1>

      <p className="max-w-2xl text-sm md:text-base">
        <strong>Eldritch Clicker</strong> is a dark incremental clicker game
        where you summon cosmic horrors, grow abominable tentacles, and corrupt
        the world — one click at a time.
      </p>

      <p className="max-w-2xl text-sm md:text-base">
        This game was created by [' ']
        <a
          href="https://www.twitch.tv/seteemio"
          className="hover:text-violet-500 transition-colors"
        >
          <strong>Seteemio</strong>
        </a>
        , a metalhead developer from France, who likes skulls, tentacles, weird
        cryptids, and writing absurd code at 2am.
      </p>

      <p className="max-w-2xl text-sm md:text-base">
        If you're enjoying the descent into madness and want to support the
        development, consider donating a coffee to fuel the cult.
      </p>

      <a href="https://ko-fi.com/U6U41EOR2E" target="_blank">
        <img
          height="36"
          style={{ border: '0px', height: '36px' }}
          src="https://storage.ko-fi.com/cdn/kofi4.png?v=6"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </div>
  );
};

export default About;

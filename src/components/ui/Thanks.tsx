const Thanks = () => {
  return (
    <div className="text-green-200 rounded-3xl p-6 text-center flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold text-green-400">👏🏻Thank You👏🏻</h1>

      <p className="max-w-2xl text-sm md:text-base">
        <strong>Eldritch Awakening</strong> could not have existed without the incredible people who gave their time,
        their energy, and their kindness to help bring this twisted dream to life.
      </p>

      <div className="space-y-4">
        <div>
          <p className="font-semibold underline">For development, design, and execution</p>
          <ul className="list-disc list-inside">
            <li>Infinityz666</li>
            <li>H0ldHaven</li>
            <li>TheCrazyHitomi</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold underline">For ideas, monkey testing, and kind-hearted feedback</p>
          <ul className="list-disc list-inside">
            <li>0niah</li>
            <li>Ptitseb</li>
            <li>Thana_Teros</li>
            <li>Shentoy</li>
            <li>Runire</li>
          </ul>
        </div>
      </div>

      <p className="italic text-sm md:text-base max-w-xl">
        From the bottom of our dark little hearts: thank you. Your support helped awaken the eldritch, and for that...
        the cosmos will never be the same again.
      </p>
    </div>
  );
};

export default Thanks;

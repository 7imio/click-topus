const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-1/2 bg-gray-700 rounded-full h-3">
    <div
      className="bg-green-500 h-3 rounded-full transition-all duration-500"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

export default ProgressBar;

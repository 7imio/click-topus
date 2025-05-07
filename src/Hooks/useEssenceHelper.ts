import { useAppSelector } from '../store/hooks';

const useEssenceHelper = () => {
  const { segmentsPerTentacle, segmentsType, essencePerSegment, maxTentacles } =
    useAppSelector((state) => state.creatures);

  const essencePerTentacle =
    segmentsPerTentacle * segmentsType * essencePerSegment;
  const essenceForCreature = maxTentacles * essencePerTentacle;

  return {
    essencePerTentacle,
    essenceForCreature,
  };
};

export default useEssenceHelper;

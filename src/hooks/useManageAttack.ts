import { useEffect } from 'react';
import { calculateConquestMultiplier } from '../helpers/math-utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { endAttack, removeOctopodeFromAttack, updateAttackTime } from '../store/slices/attackSlice';
import { incrementIndoctrination } from '../store/slices/countrySlice';
import {
  endOctopodeAttack,
  incrementVictories,
  markAsDead,
  updateConquestState,
  updateEssence,
} from '../store/slices/creatureSlice';

const TICK_INTERVAL = 100; // ms
const ATTACK_DURATION = 30; // seconds

const useManageAttack = () => {
  const dispatch = useAppDispatch();
  const { ongoingAttack } = useAppSelector((state) => state.attacks);
  const { countries } = useAppSelector((state) => state.countries);
  const { creatures } = useAppSelector((state) => state.creatures);

  useEffect(() => {
    const interval = setInterval(() => {
      ongoingAttack.forEach((attack) => {
        if (!attack.isActive) return;

        dispatch(updateAttackTime({ id: attack.id, seconds: TICK_INTERVAL / 1000 }));

        const country = countries.find((c) => c.ISO_A2 === attack.countryId);
        if (!country) return;

        const ticks = (ATTACK_DURATION * 1000) / TICK_INTERVAL;
        let totalIndoctrinationThisTick = 0;
        let allOctopodesDead = true;

        attack.octopodesId.forEach((octopodeId) => {
          const octo = creatures?.find((c) => c.creatureId === octopodeId);
          if (!octo) return;

          if (octo.essence <= 0) {
            dispatch(markAsDead({ creatureId: octo.creatureId }));
            dispatch(removeOctopodeFromAttack({ id: attack.id, octopodeId: octo.creatureId }));
            return;
          }

          allOctopodesDead = false;

          const multiplier = calculateConquestMultiplier(octo, country);
          const totalExpectedIndoctrination = Math.floor(octo.maxEssence * multiplier);
          const indoctrinationPerEssence = totalExpectedIndoctrination / octo.maxEssence;

          const essencePerTick = Math.floor(octo.maxEssence / ticks);
          const newEssence = Math.max(octo.essence - essencePerTick, 0);
          const actualEssenceSpentThisTick = octo.essence - newEssence;

          const indoctrinationThisTick = Math.floor(actualEssenceSpentThisTick * indoctrinationPerEssence);

          totalIndoctrinationThisTick += indoctrinationThisTick;

          dispatch(updateEssence({ creatureId: octo.creatureId, newEssence }));

          if (newEssence <= 0) {
            dispatch(markAsDead({ creatureId: octo.creatureId }));
          } else {
            dispatch(updateConquestState({ creatureId: octo.creatureId, inConquest: true }));
          }
        });

        if (totalIndoctrinationThisTick > 0) {
          dispatch(
            incrementIndoctrination({
              iso: country.ISO_A2,
              essenceSpent: totalIndoctrinationThisTick,
            })
          );
        }

        const isConquered = (country.indoctrinationLevel || 0) >= country.population;
        const isTimedOut = attack.elapsedTime >= ATTACK_DURATION;

        if (isConquered || allOctopodesDead || isTimedOut) {
          attack.octopodesId.forEach((octopodeId) => {
            dispatch(updateConquestState({ creatureId: octopodeId, inConquest: false }));
            dispatch(endOctopodeAttack({ creatureId: octopodeId }));
            if (isConquered) {
              dispatch(incrementVictories({ creatureId: octopodeId }));
            }
          });
          dispatch(endAttack(attack.id));
        }
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [ongoingAttack, dispatch, countries, creatures]);

  return null;
};

export default useManageAttack;

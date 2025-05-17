import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { endAttack, updateAttackTime } from '../store/slices/attackSlice';
import {
  incrementIndoctrination,
  markCountryAsConquered,
} from '../store/slices/countrySlice';
import { updateCreature } from '../store/slices/creatureSlice';
import { calculateConquestMultiplier } from '../helpers/math-utils';

const TICK_INTERVAL = 100; // 100ms ticks
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

        dispatch(
          updateAttackTime({ id: attack.id, seconds: TICK_INTERVAL / 1000 })
        );

        const country = countries.find((c) => c.ISO_A2 === attack.countryId);
        if (!country) return;

        const ticks = (ATTACK_DURATION * 1000) / TICK_INTERVAL;

        attack.octopodesId.forEach((octopodeId) => {
          const octo = creatures?.find((c) => c.creatureId === octopodeId);
          if (!octo || octo.essence <= 0) return;

          const multiplier = calculateConquestMultiplier(octo, country);
          const maxIndoctrination = octo.baseEssence * multiplier;
          const indoctrinationPerTick = maxIndoctrination / ticks;
          const essencePerTick = octo.baseEssence / ticks;

          const newIndoctrination =
            (country.indoctrinationLevel || 0) + indoctrinationPerTick;
          const newEssence = Math.max(octo.essence - essencePerTick, 0);

          const countryWillBeConquered =
            newIndoctrination >= country.population;
          const octopodeWillDie = newEssence <= 0;

          if (octopodeWillDie && !countryWillBeConquered) {
            dispatch(
              updateCreature({
                creatureId: octo.creatureId,
                creature: {
                  ...octo,
                  essence: 0,
                  isDead: true,
                  isInConquest: false,
                  canConquest: false,
                },
              })
            );
            return;
          }

          if (countryWillBeConquered) {
            const remainingPopulation =
              country.population - (country.indoctrinationLevel || 0);
            const essenceNeededForConquest = Math.floor(
              remainingPopulation / multiplier
            );
            const finalEssence = Math.max(
              octo.essence - essenceNeededForConquest,
              0
            );

            dispatch(
              updateCreature({
                creatureId: octo.creatureId,
                creature: {
                  ...octo,
                  essence: Math.floor(finalEssence),
                  isInConquest: false,
                  isDead: finalEssence <= 0,
                  canConquest: finalEssence > 0,
                  victories: (octo.victories ?? 0) + 1,
                },
              })
            );

            dispatch(markCountryAsConquered(country.ISO_A2));
            dispatch(endAttack(attack.id));
            return;
          }

          dispatch(
            incrementIndoctrination({
              iso: country.ISO_A2,
              essenceSpent: Math.floor(indoctrinationPerTick),
            })
          );

          dispatch(
            updateCreature({
              creatureId: octo.creatureId,
              creature: {
                ...octo,
                essence: Math.floor(newEssence),
              },
            })
          );

          if (newEssence <= 0) {
            dispatch(
              updateCreature({
                creatureId: octo.creatureId,
                creature: {
                  ...octo,
                  essence: 0,
                  isDead: true,
                  isInConquest: false,
                  canConquest: false,
                },
              })
            );
          }
        });

        if (attack.elapsedTime >= ATTACK_DURATION) {
          attack.octopodesId.forEach((octopodeId) => {
            const octopode = creatures?.find(
              (c) => c.creatureId === octopodeId
            );
            if (!octopode) return;

            dispatch(
              updateCreature({
                creatureId: octopodeId,
                creature: {
                  ...octopode,
                  isInConquest: false,
                  isDead: octopode.essence <= 0,
                  canConquest: octopode.essence > 0,
                  essence: Math.floor(octopode.essence), // Force integer for Redux state
                },
              })
            );
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

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { endAttack, updateAttackTime } from '../store/slices/attackSlice';
import {
  incrementIndoctrination,
  markCountryAsConquered,
} from '../store/slices/countrySlice';
import { updateCreature } from '../store/slices/creatureSlice';
import { calculateConquestMultiplier } from '../helpers/math-utils';

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

        dispatch(
          updateAttackTime({ id: attack.id, seconds: TICK_INTERVAL / 1000 })
        );

        const country = countries.find((c) => c.ISO_A2 === attack.countryId);
        if (!country) return;

        const ticks = (ATTACK_DURATION * 1000) / TICK_INTERVAL;

        let totalIndoctrinationThisTick = 0;
        let allOctopodesDead = true;

        attack.octopodesId.forEach((octopodeId) => {
          const octo = creatures?.find((c) => c.creatureId === octopodeId);
          if (!octo || octo.essence <= 0) return;

          allOctopodesDead = false; // At least one still alive

          const multiplier = calculateConquestMultiplier(octo, country);
          const indoctrinationPerTick = Math.floor(
            (octo.baseEssence * multiplier) / ticks
          );
          const essencePerTick = Math.floor(octo.baseEssence / ticks);

          const newEssence = Math.max(octo.essence - essencePerTick, 0);

          totalIndoctrinationThisTick += indoctrinationPerTick;

          dispatch(
            updateCreature({
              creatureId: octo.creatureId,
              creature: {
                ...octo,
                essence: newEssence,
                isDead: newEssence <= 0,
                isInConquest: newEssence > 0,
                canConquest: newEssence > 0,
              },
            })
          );

          // Check for instant death
          if (newEssence <= 0) return;
        });

        // Apply indoctrination for this tick globally
        if (totalIndoctrinationThisTick > 0) {
          dispatch(
            incrementIndoctrination({
              iso: country.ISO_A2,
              essenceSpent: totalIndoctrinationThisTick,
            })
          );
        }

        const isConquered =
          (country.indoctrinationLevel || 0) >= country.population;

        if (isConquered) {
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
                  victories: (octopode.victories ?? 0) + 1,
                  canConquest: octopode.essence > 0,
                  isDead: octopode.essence <= 0,
                },
              })
            );
          });

          dispatch(markCountryAsConquered(country.ISO_A2));
          dispatch(endAttack(attack.id));
          return; // Fin immédiate
        }

        // Si tous les octopodes sont morts, on arrête l'attaque
        if (allOctopodesDead) {
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
                },
              })
            );
          });

          dispatch(endAttack(attack.id));
          return;
        }

        // Fin de l'attaque après la durée max atteinte
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

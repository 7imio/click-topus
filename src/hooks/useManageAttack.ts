import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { endAttack, updateAttackTime } from '../store/slices/attackSlice';
import {
  incrementIndoctrination,
  markCountryAsConquered,
} from '../store/slices/countrySlice';
import { updateCreature } from '../store/slices/creatureSlice';
import { calculateConquestMultiplier } from '../helpers/math-utils';

const TICK_INTERVAL = 100; // 100ms for smooth visual feedback
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

          const multiplier = Math.floor(
            calculateConquestMultiplier(octo, country)
          );
          const maxIndoctrination = octo.baseEssence * multiplier;
          const indoctrinationPerTick = Math.floor(maxIndoctrination / ticks);

          const essencePerTick = Math.floor(
            octo.essence / ((ATTACK_DURATION * 1000) / TICK_INTERVAL)
          );

          const newIndoctrination =
            (country.indoctrinationLevel || 0) + indoctrinationPerTick;
          const newEssence = Math.max(octo.essence - essencePerTick, 0);

          const countryWillBeConquered =
            newIndoctrination >= country.population;
          const octopodeWillDie = newEssence <= 0;

          // 💀 Octopode meurt avant conquête
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

          // 🎉 Conquête terminée avant mort de l'octopode
          if (countryWillBeConquered) {
            const essenceNeededForConquest = Math.floor(
              country.population / multiplier
            );
            const finalEssence = Math.max(
              octo.baseEssence - essenceNeededForConquest,
              0
            );

            dispatch(
              updateCreature({
                creatureId: octo.creatureId,
                creature: {
                  ...octo,
                  essence: finalEssence,
                  isInConquest: false,
                  isDead: finalEssence <= 0,
                  canConquest: finalEssence > 0,
                  victories: (octo.victories ?? 0) + 1,
                },
              })
            );

            dispatch(markCountryAsConquered(country.ISO_A2));

            // 🛑 On sort de la boucle pour cet octopode ET on termine l'attaque pour éviter les double-victoires
            dispatch(endAttack(attack.id));
            return;
          }

          // 🛡️ Combat en cours
          dispatch(
            incrementIndoctrination({
              iso: country.ISO_A2,
              essenceSpent: indoctrinationPerTick,
            })
          );

          dispatch(
            updateCreature({
              creatureId: octo.creatureId,
              creature: { ...octo, essence: newEssence },
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

        // ✅ Fin de l'attaque si le temps est écoulé
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

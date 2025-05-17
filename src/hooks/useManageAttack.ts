import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { endAttack, updateAttackTime } from '../store/slices/attackSlice';
import { incrementIndoctrination } from '../store/slices/countrySlice';
import { updateCreature } from '../store/slices/creatureSlice';
import { calculateBattleOutcome } from '../helpers/math-utils';

const TICK_INTERVAL = 1000; // 1 second

const useManageAttack = () => {
  const dispatch = useAppDispatch();
  const { ongoingAttack } = useAppSelector((state) => state.attacks);
  const { countries } = useAppSelector((state) => state.countries);
  const { creatures } = useAppSelector((state) => state.creatures);

  useEffect(() => {
    const interval = setInterval(() => {
      ongoingAttack.forEach((attack) => {
        if (!attack.isActive) return;

        dispatch(updateAttackTime({ id: attack.id, seconds: 1 }));

        const country = countries.find((c) => c.ISO_A2 === attack.countryId);
        if (!country) return;

        attack.octopodesId.forEach((octopodeId) => {
          const octo = creatures?.find((c) => c.creatureId === octopodeId);
          if (!octo || octo.essence <= 0) return;

          // 👇 Calcul de la répartition par seconde
          const { totalEssenceSpent, totalIndoctrination } =
            calculateBattleOutcome(octo, country, attack.attackTime);

          const essencePerSecond = Math.floor(
            totalEssenceSpent / attack.attackTime
          );
          const indoctrinationPerSecond = Math.floor(
            totalIndoctrination / attack.attackTime
          );

          // ✅ Appliquer les effets progressifs
          if (indoctrinationPerSecond > 0) {
            dispatch(
              incrementIndoctrination({
                iso: country.ISO_A2,
                essenceSpent: indoctrinationPerSecond,
              })
            );
          }

          // 🐙 Appliquer la perte d'essence
          const newEssence = Math.max(octo.essence - essencePerSecond, 0);

          dispatch(
            updateCreature({
              creatureId: octo.creatureId,
              creature: {
                ...octo,
                essence: newEssence,
              },
            })
          );

          if (country.isConquered) {
            // 🎉 Victoire : L'octopode revient à la base
            dispatch(
              updateCreature({
                creatureId: octo.creatureId,
                creature: {
                  ...octo,
                  isInConquest: false,
                  isDead: false,
                  canConquest: true, // Il peut repartir en conquête
                },
              })
            );
          } else if (newEssence <= 0) {
            // 💀 Défaite : L'octopode meurt
            dispatch(
              updateCreature({
                creatureId: octo.creatureId,
                creature: {
                  ...octo,
                  isDead: true,
                  isInConquest: false,
                  canConquest: false,
                },
              })
            );
          }
        });

        // 🎉 Fin de l'attaque
        if (attack.elapsedTime + 1 >= attack.attackTime) {
          console.log('attack ended', attack);
          const { octopodesId } = attack;
          octopodesId.forEach((octopodeId) => {
            const octopode = creatures?.find(
              (c) => c.creatureId === octopodeId
            );
            if (!octopode) return;
            dispatch(
              updateCreature({
                creatureId: octopodeId,
                creature: { ...octopode, isInConquest: false },
              })
            );
          });
          dispatch(endAttack(attack.id));
        }
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [ongoingAttack, dispatch, countries, creatures]);
};

export default useManageAttack;

import { Country } from '../types/Country';
import { Creature } from '../types/Creature';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  startAttack,
  addOctopodeToAttack,
  updateAttackTimeManual,
} from '../store/slices/attackSlice';
import { updateCreature } from '../store/slices/creatureSlice';
import { calculateDynamicAttackTime } from '../helpers/math-utils';

export const useSendOctopodeToConquest = () => {
  const dispatch = useAppDispatch();
  const { ongoingAttack } = useAppSelector((state) => state.attacks);
  const { creatures } = useAppSelector((state) => state.creatures);

  const send = (octopode: Creature, country: Country) => {
    if (!octopode.canConquest || octopode.isInConquest) return;
    if (!creatures) return;

    const existingAttack = ongoingAttack.find(
      (a) => a.countryId === country.ISO_A2 && a.isActive
    );

    if (existingAttack) {
      dispatch(
        addOctopodeToAttack({
          id: existingAttack.id,
          octopodeId: octopode.creatureId,
        })
      );

      const involvedOctopodes = existingAttack.octopodesId
        .map((id) => creatures.find((c) => c.creatureId === id))
        .filter(Boolean) as Creature[];

      const attackTime = calculateDynamicAttackTime(
        [...involvedOctopodes, octopode],
        country
      );
      dispatch(updateAttackTimeManual({ id: existingAttack.id, attackTime }));
    } else {
      const attackTime = calculateDynamicAttackTime([octopode], country);
      dispatch(
        startAttack({
          countryId: country.ISO_A2,
          octopodesId: [octopode.creatureId],
          attackTime,
          name: '',
        })
      );
    }

    dispatch(
      updateCreature({
        creatureId: octopode.creatureId,
        creature: {
          ...octopode,
          isInConquest: true,
          lastConquestTarget: country.ISO_A2,
        },
      })
    );
  };

  return send;
};

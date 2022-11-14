import { FC, useRef } from 'react';
import { useActions } from '../../../../../hooks/useActions';
import { useOutside } from '../../../../../hooks/useOutside';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { SetState } from '../../../../../utils/types';

const Individual: FC<{ open: boolean; setOpen: SetState<boolean> }> = ({ open, setOpen }) => {
  const ref = useRef(null);
  useOutside(ref, () => setOpen(false), 'individualException');

  const { individuals } = useTypedSelector((store) => store.individual);
  const { selectIndividual } = useActions();

  return (
    <>
      {open && (
        <div
          ref={ref}
          className="absolute top-16 w-48 text-black bg-white shadow-lg"
        >
          {individuals.map((individual) => (
            <p
              key={individual.id}
              onClick={() => {
                selectIndividual(individual);
                setOpen(false);
              }}
              className="py-1 px-2 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out"
            >
              {individual.individual_entrepreneur}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Individual;

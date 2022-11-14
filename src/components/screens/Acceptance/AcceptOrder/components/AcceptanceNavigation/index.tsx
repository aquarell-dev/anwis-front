import { FC } from 'react';
import { Acceptance } from '../../../../../../types/acceptance.types';
import { GreenButton, IndigoButton } from '../../../../../ui/Button';

const AcceptanceNavigation: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  return (
    <div className="flex items-center space-x-4 border-b border-slate-600 py-2 px-4">
      <h1 className="text-2xl font-medium">{acceptance.title}</h1>
      <p>
        Дата Создания: <span className="font-medium">{acceptance.created_at}</span>
      </p>
      <IndigoButton
        type="button"
        text="Печать этикеток"
        customWidth="w-80"
        handler={() => {}}
      />
      <GreenButton
        type="button"
        text="Печать ПДФ"
        customWidth="w-80"
        handler={() => {}}
      />
    </div>
  );
};

export default AcceptanceNavigation;

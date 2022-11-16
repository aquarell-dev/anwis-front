import { FC } from 'react';

import { IndigoButton } from '../../../../../ui/Button';

const Navigation: FC = () => {
  return (
    <div className='flex items-center space-x-8'>
      <h1 className='text-2xl font-medium'>Русские Товары</h1>
      <IndigoButton
        type='button'
        handler={() => {}}
        text='Товар'
      />
      <IndigoButton
        type='button'
        handler={() => {}}
        text='Категория'
      />
    </div>
  );
};

export default Navigation;

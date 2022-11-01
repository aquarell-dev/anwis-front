import { FC, useState } from 'react';

import {
  useCreateLeftoverMutation,
  useListLeftoversQuery,
  useUpdateLeftoversMutation
} from '../../../../features/order/orderApi';

import { IndigoButton } from '../../../ui/Button';
import Expand from 'react-expand-animated';
import { FancyInput } from '../../../ui/Input';

import { notifyError, notifySuccess } from '../../../../utils/notify';


const LeftOver: FC = () => {
    const [open, setOpen] = useState(false);
    const [leftOver, setLeftover] = useState({
      url: '',
      photo_url: ''
    });

  const { data, isLoading, error } = useListLeftoversQuery(null);
  const [createLeftover, { isLoading: createLeftoverLoading }] = useCreateLeftoverMutation();
  const [updateLeftovers, { isLoading: updateLeftoversLoading }] = useUpdateLeftoversMutation();

  if (isLoading || createLeftoverLoading || updateLeftoversLoading) return <p>Loading...</p>;

  if (error) return <p>error...</p>;

  return (
    <>
      <div className="flex flex-col space-y-2 mx-4 my-6">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 md:items-center">
          <IndigoButton
            type={'button'}
            text={open ? 'Создать' : 'Новый товар'}
            handler={() => {
              if (!open) return setOpen(true);

              if (!leftOver.photo_url || !leftOver.url) return notifyError('Заполните поля');

              createLeftover(leftOver)
                .unwrap()
                .then(() => notifySuccess('Создан новый товар'))
                .catch(() => notifyError('Не создан новый товар'))
                .finally(() => setOpen(false));
            }}
          />
          <IndigoButton
            type={'button'}
            text={'Обновить'}
            handler={() => {
              updateLeftovers(null)
                .unwrap()
                .then(() => notifySuccess('123'))
                .catch(() => notifyError('123'))
              ;
            }}
          />
        </div>
        <Expand open={open}>
          <div className="flex flex-col space-y-2">
            <FancyInput
              value={leftOver.url}
              customWidth={'w-[700px]'}
              handler={(e) => setLeftover({ ...leftOver, url: e.target.value })}
              placeholder={'Ссылка на товар'}
            />
            <FancyInput
              value={leftOver.photo_url}
              customWidth={'w-[700px]'}
              handler={(e) => setLeftover({ ...leftOver, photo_url: e.target.value })}
              placeholder={'Ссылка на картинку товара'}
            />
          </div>
        </Expand>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 w-full mx-4 my-6'>
        {data && data.map(leftover => (
          <div
            className='w-[200px] md:w-[350px] border border-gray-300 min-h-56 rounded-md cursor-pointer hover:bg-gray-100 duration-300 transition ease-in-out'
            key={leftover.id}
          >
            <a
              href={leftover.url}
              target='_blank'
            >
              <div className="flex justify-between items-center h-full mx-2">
                <div className="flex flex-col">
                  <img
                    src={leftover.photo_url}
                    className='w-20'
                    alt={leftover.title}
                  />
                  <p className='text-[10px] max-w-[40%]'>
                    {leftover.title}
                  </p>
                </div>
                <div className="flex flex-col w-1/2 space-y-2">
                  {leftover.products.map(product => (
                    <div key={product.id}>
                      <p><span>{product.title}</span> - <span>{product.quantity}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeftOver;

import { FC, useState } from 'react';

import {
  useCreateLeftoverMutation,
  useListLeftoversQuery,
  useUpdateLeftoversMutation,
  useResetCacheMutation
} from '../../../../store/api/leftover.api';
import useNotifications from '../../../../hooks/useNotifications';

import { IndigoButton } from '../../../ui/Button';
import Expand from 'react-expand-animated';
import { FancyInput } from '../../../ui/Input';
import Loader from '../../../ui/Loader';

import { cn } from '../../../../utils';


const LeftOver: FC = () => {
  const [open, setOpen] = useState(false);
  const [leftOver, setLeftover] = useState({
    url: '',
    photo_url: ''
  });

  const { data, isLoading, error } = useListLeftoversQuery(null);
  const [createLeftover, { isLoading: createLeftoverLoading }] = useCreateLeftoverMutation();
  const [updateLeftovers, { isLoading: updateLeftoversLoading }] = useUpdateLeftoversMutation();
  const [resetCache, { isLoading: resetLeftoversLoading }] = useResetCacheMutation();
  const { notifySuccess, notifyError } = useNotifications();

  let total = 0;
  let buffer = 0;

  data?.forEach(leftover => {
    total += leftover.total;
    buffer += leftover.buffer_total;
  });

  const resetRequired = data?.map(leftover => leftover.sorted_buffer.length > 0).some(x => !x);

  if (isLoading || createLeftoverLoading || updateLeftoversLoading || resetLeftoversLoading) return <Loader isLoading={true}/>;

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
            text={'Обновить кэш'}
            handler={() => {
              resetCache(null)
                .unwrap()
                .then(() => notifySuccess('Кэш обновлен'))
                .catch(() => notifyError('Кэш не обновлен'));
            }}
          />
          <IndigoButton
            type={'button'}
            text={'Обновить'}
            handler={() => {
              updateLeftovers(null)
                .unwrap()
                .then(() => notifySuccess('Товары обновлены'))
                .catch(() => notifyError('Товары не обновлены'));
            }}
          />
        </div>
        {resetRequired && <p className='font-medium text-red-500 text-xl'>Обновите кэш для корректного отображения данных</p>}
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
      <p>Всего - <span className='font-medium'>{total}</span></p>
      <p>Было - <span className='font-medium'>{buffer}</span></p>
      <p>Заказно - <span className='font-medium'>{buffer - total}</span></p>
      <p>Последнее обновление - <span className='font-medium'>{data && data[0].last_update}</span></p>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 w-full mx-4 my-6'>
        {data && data.map(leftover => (
          <div
            className='w-[275px] md:w-[350px] border border-gray-300 min-h-56 rounded-md cursor-pointer hover:bg-gray-100 duration-300 transition ease-in-out'
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
                <div className="flex flex-col w-full text-right space-y-2">
                  {leftover.sorted_products.map((product, idx) => (
                    <div key={product.id}>
                      <p
                        className={cn(
                          'text-[12px] md:text-sm',
                          leftover.buffer.length > 0 && product.quantity !== leftover.sorted_buffer[idx].quantity ? 'text-red-500' : ''
                        )}
                      ><span>{product.title}</span> - <span>{product.quantity}</span> / ({leftover.buffer.length > 0 ? leftover.sorted_buffer[idx].quantity : 'Нет данных'}шт)
                      </p>
                    </div>
                  ))}
                  <p>Всего - <span>{leftover.total}</span></p>
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

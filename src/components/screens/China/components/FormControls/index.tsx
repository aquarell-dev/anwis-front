import { FC, useState } from 'react';

import { IFormControls } from '../../types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormSelect, { StatusSelect } from './FormSelect';
import Popups from './Popups';
import ChoseCreateBlock from '../ChooseCreateBlock';
import Notification from '../OrderForm/Notification.js';


const FormControls: FC<IFormControls> = ({
                                           chinaDistributors,
                                           orderForProjects,
                                           statuses,
                                           control,
                                           order,
                                           setSelectedStatus
                                         }) => {
  const [orderForProjectOpen, setOrderForProjectOpen] = useState(false);
  const [chinaDistributorOpen, setChinaDistributorOpen] = useState(false);

  const [orderForProjectValue, setOrderForProjectValue] = useState('');
  const [chinaDistributorValue, setChinaDistributorValue] = useState('');

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <ChoseCreateBlock setState={setChinaDistributorOpen}>
            <FormSelect
              control={control}
              name={'china_distributor'}
              options={chinaDistributors.map(chinaDistributor => ({
                label: chinaDistributor.china_distributor,
                value: chinaDistributor.id.toString()
              }))}
              placeholder={'Китайский посредник'}
              defaultValue={order ? order.china_distributor.id.toString() : ''}
            />
          </ChoseCreateBlock>
          <ChoseCreateBlock setState={setOrderForProjectOpen}>
            <FormSelect
              control={control}
              name={'order_for_project'}
              options={orderForProjects.map(orderForProject => ({
                label: orderForProject.order_for_project,
                value: orderForProject.id.toString()
              }))}
              placeholder={'Проект'}
              defaultValue={order ? order.order_for_project.id.toString() : ''}
            />
          </ChoseCreateBlock>
          <StatusSelect
            control={control}
            options={statuses.map(status => ({
              label: status.status,
              value: status.id.toString(),
              color: status.color
            }))}
            defaultValue={order ? order.status.id.toString() : '1'}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      </div>
      <Popups
        chinaDistributorOpen={chinaDistributorOpen}
        setChinaDistributorOpen={setChinaDistributorOpen}

        chinaDistributorValue={chinaDistributorValue}
        setChinaDistributorValue={setChinaDistributorValue}

        orderForProjectOpen={orderForProjectOpen}
        setOrderForProjectOpen={setOrderForProjectOpen}

        orderForProjectValue={orderForProjectValue}
        setOrderForProjectValue={setOrderForProjectValue}
      />
      <ToastContainer/>
    </>
  );
};

export default FormControls;
import { FC, useState } from 'react'
import { SpinnerComponent } from 'react-element-spinner'
// import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import useCreateAcceptanceFromOrder from '../../hooks/useCreateAcceptanceFromOrder'

import { GreenButton, IndigoButton } from '../../../../../ui/Button'
import { IFormControls } from '../../../types'
import ChoseCreateBlock from '../ChooseCreateBlock'
import FormSelect, { StatusSelect } from '../FormSelect'
import Popups from '../Popups'

const FormControls: FC<IFormControls> = ({
  chinaDistributors,
  orderForProjects,
  statuses,
  control,
  order,
  selectedStatus,
  setSelectedStatus
}) => {
  const [orderForProjectOpen, setOrderForProjectOpen] = useState(false)
  const [chinaDistributorOpen, setChinaDistributorOpen] = useState(false)

  const [orderForProjectValue, setOrderForProjectValue] = useState('')
  const [chinaDistributorValue, setChinaDistributorValue] = useState('')

  const { createAcceptanceFromOrder, isLoading } = useCreateAcceptanceFromOrder()
  // const navigate = useNavigate()

  return (
    <>
      <div className='flex items-center justify-center xl:justify-between'>
        <div className='flex flex-col xl:flex-row items-start xl:items-start space-y-4 xl:space-y-0 xl:space-x-3 2xl:space-x-8'>
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
                label: orderForProject.project,
                value: orderForProject.id.toString()
              }))}
              placeholder={'Проект'}
              defaultValue={order ? order.order_for_project.id.toString() : ''}
            />
          </ChoseCreateBlock>
          <div className='flex flex-col space-y-2 w-64 xl:w-96'>
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
            {selectedStatus === 'Заказ в Москве' && !order?.acceptance ? (
              <IndigoButton
                type='button'
                customWidth='w-full'
                handler={async () => order && (await createAcceptanceFromOrder(order))}
              >
                {isLoading ? (
                  <SpinnerComponent
                    loading
                    position='inline'
                  />
                ) : (
                  'Создать приемку'
                )}
              </IndigoButton>
            ) : (
              selectedStatus === 'Заказ в Москве' && (
                <GreenButton
                  type='button'
                  text='Перейти к приемке'
                  customWidth='w-full'
                  handler={() => {
                    // navigate(`../../acceptance/acceptances/${order?.acceptance}/`)
                  }}
                />
              )
            )}
          </div>
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
    </>
  )
}

export default FormControls

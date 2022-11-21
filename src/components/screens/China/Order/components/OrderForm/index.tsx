import { FC } from 'react'
import { useForm } from 'react-hook-form'

import useOrder from '../../hooks/useOrder'
import useStatusChange from '../../hooks/useStatusChange'
import useStatusShow from '../../hooks/useStatusShow'
import useSubmitOrder from '../../hooks/useSubmitOrder'

import { IOrder } from '../../../../../../features/order/order.types'
import { ContentContainer } from '../../../../../ui/Container'
import Loader from '../../../../../ui/Loader'
import { IOrderForm } from '../../../types'
import AdditionalExpenses from '../AdditionalExpenses'
import BottomControls from '../BottomControls'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import CargoShipInfo from '../CargoShipInfo'
import FormControls from '../FormControls'
import Header from '../Header'
import Notification from '../Notification'
import Products from '../Products'
import ReadyOrderDate from '../ReadyOrderDate'

const OrderForm: FC<{ order?: IOrder }> = ({ order }) => {
  const {
    chinaDistributors,
    orderForProjects,
    statuses,
    products,
    isLoading,
    isError,
    additional,
    setAdditional,
    selectedProducts,
    setSelectedProducts,
    selectedStatus,
    setSelectedStatus
  } = useOrder(order)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<IOrderForm>()
  const show = useStatusShow(statuses, selectedStatus)
  const { onSubmit, mutationLoading } = useSubmitOrder({ order, selectedProducts })
  useStatusChange({ selectedStatus, setValue, statuses })

  if (isLoading || mutationLoading) return <Loader isLoading={true} />

  if (isError) return <p>error</p>

  return (
    <ContentContainer>
      {chinaDistributors && orderForProjects && statuses && products && (
        <>
          <form
            onKeyDown={e => e.code === 'Enter' && e.preventDefault()}
            className='flex flex-col space-y-4'
          >
            <Header order={order} />
            <FormControls
              errors={errors}
              selectedStatus={selectedStatus}
              register={register}
              orderForProjects={orderForProjects}
              chinaDistributors={chinaDistributors}
              statuses={statuses}
              order={order}
              control={control}
              setSelectedStatus={setSelectedStatus}
            />
            {show('Отправлен поставщику для просчета') && (
              <AdditionalExpenses
                additional={additional}
                setAdditional={setAdditional}
                selectedProducts={selectedProducts}
                selectedStatus={selectedStatus}
                setSelectedProducts={setSelectedProducts}
                setSelectedStatus={setSelectedStatus}
                order={order}
                statuses={statuses}
              />
            )}
            {show('Заказ оформлен') && (
              <ReadyOrderDate
                selectedStatus={selectedStatus}
                order={order}
                show={show}
              />
            )}
            {show('Отправлен из Китая') && (
              <CargoShipInfo
                order={order}
                statuses={statuses}
                setSelectedStatus={setSelectedStatus}
              />
            )}
            <Products
              products={products}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              additional={additional}
              setAdditional={setAdditional}
              order={order}
            />
            <BottomControls
              register={register}
              order={order}
              setValue={setValue}
            />
            <Notification order={order} />
          </form>
          <ButtonGroup
            selectedStatus={selectedStatus}
            order={order}
            setSelectedStatus={setSelectedStatus}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </>
      )}
    </ContentContainer>
  )
}

export default OrderForm

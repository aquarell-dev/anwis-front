import React, { FC, useState } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import usePayment from '../../hooks/usePayment'

import { GreenButton } from '../../../../ui/Button'
import { FancyInput } from '../../../../ui/Input'
import Loader from '../../../../ui/Loader'

const Payment: FC = () => {
  const {
    mainPaymentId,
    isLoading,
    isFetching,
    updatePayment,
    paymentLoading,
    paidBreak,
    setPaidBreak,
    paymentPerHour,
    setPaymentPerHour
  } = usePayment()

  if (isLoading) return <Loader isLoading />

  return (
    <div className='relative w-[300px] sm:w-[350px] lg:w-[400px] min-h-[500px] rounded-md border px-2 py-2 border-gray-300 overflow-y-auto'>
      <SpinnerComponent
        loading={isFetching || paymentLoading}
        position='centered'
        backgroundColor='grey'
      />
      <h1 className='text-center text-xl mt-3 font-medium'>Оплата Работникам</h1>
      <div className='flex flex-col space-y-12 items-center mt-8'>
        <FancyInput
          value={paymentPerHour}
          placeholder='Ставка В Час, ₽'
          showLabel
          customWidth='w-80'
          handler={e => setPaymentPerHour(e.target.value)}
        />
        <div className='flex flex-col space-y-4'>
          <p className='text-center'>Оплачиваемый Перерыв</p>
          <div className='flex space-x-8 items-center'>
            <FancyInput
              value={paidBreak.hours}
              handler={e => setPaidBreak({ ...paidBreak, hours: e.target.value })}
              placeholder='Часы'
              showLabel
              customWidth='w-36'
            />
            <FancyInput
              value={paidBreak.minutes}
              handler={e => setPaidBreak({ ...paidBreak, minutes: e.target.value })}
              placeholder='Минуты'
              showLabel
              customWidth='w-36'
            />
          </div>
        </div>
      </div>
      <div className='absolute left-1/2 bottom-0 -translate-x-1/2 mb-4'>
        <GreenButton
          type='button'
          handler={async () => await updatePayment(mainPaymentId)}
          customWidth='w-80'
          text='Сохранить'
        />
      </div>
    </div>
  )
}

export default Payment

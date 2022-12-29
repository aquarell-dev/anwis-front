import React, { FC } from 'react'

import useFbo from '../../hooks/useFbo'
import useFboAcceptances from '../../hooks/useFboAcceptances'

import { ListAcceptance } from '../../../../../../types/acceptance.types'
import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'
import MiniAcceptance from '../MiniAcceptance'
import SelectProductsPopup from '../SelectProductsPopup'

const ShippingDrop: FC<{ currentDragAcceptance: ListAcceptance | null }> = ({
  currentDragAcceptance
}) => {
  const { setSubmittedAcceptances, submittedAcceptances, drop, open, setOpen } = useFboAcceptances()

  const { createFbo } = useFbo()

  return (
    <>
      <SelectProductsPopup
        acceptance={submittedAcceptances.find(a => a.id === currentDragAcceptance?.id) ?? null}
        setSubmittedAcceptances={setSubmittedAcceptances}
        state={open}
        setState={setOpen}
        width='min-w-[1400px]'
        height='min-h-[900px]'
      />
      <div
        className='w-full p-4 border rounded-md shadow-xl h-[500px] bg-gray-100'
        onDragLeave={e => e.currentTarget.setAttribute('style', 'background-color: #f3f4f6;')}
        onDragOver={e => {
          e.preventDefault()
          e.currentTarget.setAttribute('style', 'background-color: #d1d5db;')
        }}
        onDrop={e => {
          drop(currentDragAcceptance)
          e.currentTarget.setAttribute('style', 'background-color: #f3f4f6;')
        }}
      >
        {submittedAcceptances.length > 0 ? (
          <div className='grid grid-cols-3 gap-x-6 gap-y-8'>
            {submittedAcceptances.map(acceptance => (
              <MiniAcceptance
                acceptance={acceptance}
                key={acceptance.id}
              >
                <div
                  className='h-4 w-4 flex items-center justify-center bg-rose-500 absolute -top-1 -right-1 rounded-full hover:bg-rose-600 duration-300 transition ease-in-out'
                  onClick={() =>
                    setSubmittedAcceptances(prev => prev.filter(a => a.id !== acceptance.id))
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </div>
                <div className='mt-4 flex space-x-4 items-center'>
                  <GreenButton
                    type='button'
                    handler={() => {}}
                    text='Изменить'
                  />
                  <p>
                    Выбрано товаров: {acceptance.specifications.filter(s => s.fbo_quantity).length}
                  </p>
                </div>
              </MiniAcceptance>
            ))}
          </div>
        ) : (
          <div className='flex w-full h-full items-center justify-center text-6xl text-slate-600'>
            Перенесите Сюда Приемки
          </div>
        )}
      </div>
      <div className='flex items-center space-x-4 mt-6'>
        <IndigoButton
          type='button'
          handler={async () => await createFbo(submittedAcceptances)}
          customWidth='w-80'
          text='Создать Отгрузку'
        />
        <RedButton
          type='button'
          handler={() => setSubmittedAcceptances([])}
          customWidth='w-80'
          text='Очистить'
        />
      </div>
    </>
  )
}

export default ShippingDrop

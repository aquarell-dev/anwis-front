import { DragEventHandler, FC, ReactNode } from 'react'

import useAcceptances from '../../../Acceptances/hooks/useAcceptances'

import { ListAcceptance } from '../../../../../../types/acceptance.types'
import { cn, getFourDigitId } from '../../../../../../utils'
import { GreenButton } from '../../../../../ui/Button'

const MiniAcceptance: FC<{
  acceptance: ListAcceptance
  draggable?: boolean
  dragStart?: DragEventHandler<HTMLDivElement>
  dragEnd?: DragEventHandler<HTMLDivElement>
  dragOver?: DragEventHandler<HTMLDivElement>
  dragLeave?: DragEventHandler<HTMLDivElement>
  onDrop?: DragEventHandler<HTMLDivElement>
  children?: ReactNode
}> = ({ acceptance, draggable, dragStart, dragEnd, dragLeave, dragOver, onDrop, children }) => {
  const { getQuantity } = useAcceptances()

  return (
    <div
      className={cn(
        'relative w-full min-h-[120px] rounded-md border shadow-xl p-4 hover:bg-gray-100 duration-300 transition ease-in-out',
        draggable ? 'cursor-grab' : 'cursor-pointer'
      )}
      draggable={draggable}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={onDrop}
    >
      <div className='flex flex-col space-y-3'>
        <p className='text-2xl font-medium'>
          {acceptance.title ?? `Приемка ${getFourDigitId(acceptance.id)}`}
        </p>
        <div className='grid grid-cols-2'>
          <p>
            <span className='font-medium'>Дата Создания:</span> {acceptance.created_at}
          </p>
          <p>
            <span className='font-medium'>Количество:</span> {getQuantity(acceptance)}
          </p>
        </div>
        <div className='flex items-center space-x-1'>
          <div
            className='h-6 w-6 rounded-full border shadow-xl'
            style={{ backgroundColor: acceptance.status.color }}
          />
          <p className='font-medium'>{acceptance.status.status}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default MiniAcceptance

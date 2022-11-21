import { FC, useState } from 'react'

import { SetState } from '../../../../../../utils/types'
import ConfirmationPopup from '../../../../../ui/ConfirmationPopup'
import MutatePopup from '../../../../../ui/MutatePopup'

const CRUDContent: FC<{
  content: string
  id: number
  onDelete: () => void
  onUpdate: () => void
  value: string
  setValue: SetState<string>
  loading?: boolean
  placeholder: string
}> = ({ content, id, onUpdate, onDelete, setValue, value, loading, placeholder }) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [changeOpen, setChangeOpen] = useState(false)

  return (
    <>
      <div className='flex border-t border-b items-center space-x-4 w-full border-slate-800'>
        <p className='py-1 px-2'>{content}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 ease-in-out transition'
          onClick={() => {
            setValue(content)
            setChangeOpen(true)
          }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
          />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 cursor-pointer hover:text-slate-700 duration-300 ease-in-out transition'
          onClick={() => setDeleteOpen(true)}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z'
          />
        </svg>
      </div>
      <MutatePopup
        open={changeOpen}
        setOpen={setChangeOpen}
        value={value}
        setValue={setValue}
        content={`Вы уверены, что хотите изменить "${placeholder}"?`}
        onMutate={onUpdate}
        width='w-[500px]'
        placeholder={placeholder}
        closeOnEnd
      />
      <ConfirmationPopup
        loading={loading}
        open={deleteOpen}
        deleteQuestion={`Вы уверены, что хотите удалить "${content}"`}
        onConfirm={onDelete}
        setOpen={setDeleteOpen}
      />
    </>
  )
}

export default CRUDContent

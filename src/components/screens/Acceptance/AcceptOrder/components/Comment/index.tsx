import { FC } from 'react'

const Comment: FC = () => {
  return (
    <div className='w-full my-6 border-t-2 border-slate-600 py-6 flex space-x-8 items-start'>
      <div className='p-4 h-auto shadow-xl w-1/2 rounded-md border'>
        <textarea
          className='w-full outline-none min-h-[62px] h-full'
          placeholder='Комментарий...'
        />
      </div>
    </div>
  )
}

export default Comment

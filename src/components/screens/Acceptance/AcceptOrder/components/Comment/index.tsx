import { FC } from 'react'

import { SetState } from '../../../../../../utils/types'

const Comment: FC<{ comment: string; setComment: SetState<string> }> = ({
  comment,
  setComment
}) => {
  return (
    <div className='w-full flex space-x-8 items-start'>
      <div className='px-4 py-2 h-auto shadow-xl w-full rounded-md border'>
        <textarea
          className='w-full outline-none min-h-[62px] h-full'
          placeholder='Комментарий...'
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Comment

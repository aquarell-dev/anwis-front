import { FC } from 'react'

import { TDocument } from '../../../features/documents/document.types'
import FileDragAndDrop from '../../ui/FileDragNDrop'

const AttachDocument: FC<{ documents?: TDocument[] }> = ({ documents }) => {
  return (
    <div className='flex flex-col space-y-4 w-1/2'>
      <div className='w-full flex flex-col space-y-2'>
        <p>Прикрепление документов</p>
        <FileDragAndDrop
          type='document'
          multiple={true}
        />
      </div>
      <div className='flex w-full flex-col space-y-2'>
        <p>Документы заказа</p>
        <div className='flex w-full flex-col space-y-4 h-40 overflow-x-hidden overflow-y-auto'>
          {documents?.map(document => (
            <div
              className='flex items-center space-x-1 cursor-pointer'
              key={document.id}
            >
              <a
                href={document.path}
                download
                className='text-slate-800 underline hover:text-slate-600 transition duration-300 ease-in-out'
                target='_blank'
                rel='noreferrer'
              >
                {document?.title ? document.title : document.path.split('/').at(-1)}
              </a>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AttachDocument

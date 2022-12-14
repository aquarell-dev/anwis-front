import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { cn } from '../../../utils'
import { ISubNavElement } from './types'

const SubNavbar: FC<{ elements: ISubNavElement[] }> = ({ elements }) => {
  const router = useRouter()

  return (
    <div className='block w-11/12 mx-auto min-h-12 rounded-b-lg shadow-md bg-gray-100'>
      <div className='w-full h-full flex flex-col lg:flex-row items-center px-4 py-2 space-x-4'>
        {elements.map(({ link, title }, idx) => (
          <div
            className='px-2 cursor-pointer transition duration-300 ease-in-out rounded-md hover:bg-gray-200 py-1'
            key={idx}
          >
            <Link href={link}>
              <p
                className={cn(
                  router.pathname.includes(link)
                    ? 'underline underline-offset-2 underline-indigo-600'
                    : ''
                )}
              >
                {title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubNavbar

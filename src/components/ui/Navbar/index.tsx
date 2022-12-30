import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import { useActions } from '../../../hooks/useActions'
import useAuth from '../../../hooks/useAuth'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

import Individual from './components/Individual'
import Notifications from './components/Notifications'
import Sidebar from './components/Sidebar'
import { links } from './links'

const Button = dynamic(() => import('../Button').then(mod => mod.Button), { ssr: false })

const Navbar: FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [individualOpen, setIndividualOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { currentSelectedIndividual } = useTypedSelector(state => state.individual)

  const { isAuth } = useAuth()

  const { logOut } = useActions()

  const router = useRouter()

  return (
    <>
      <div className='d-none sm:flex h-16 bg-indigo-600 shadow-md py-2 px-4 items-center justify-between text-white'>
        <div className='flex items-end space-x-4 w-4/6'>
          <h1 className='font-medium text-xl lg:text-2xl'>
            <Link href='/'>Anwis Dashboard</Link>
          </h1>
          <div className='d-none lg:flex w-1/2 items-center space-x-2'>
            {links.map(link => (
              <Link
                href={link.link}
                key={link.id}
                className='text-lg hover:underline hover:text-gray-100 transition duration-300 ease-in-out'
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 block lg:hidden cursor-pointer hover:text-gray-200 transition duration-300 ease-in-out'
            onClick={() => setSidebarOpen(true)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
          <div className='block h:hidden lg:flex items-center space-x-4'>
            <div
              className='individualException w-48 text-slate-800 py-1 px-2 bg-slate-100 rounded-md shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-200 transition duration-300 ease-in-out'
              onClick={() => setIndividualOpen(!individualOpen)}
            >
              <p
                style={{ userSelect: 'none' }}
                className='individualException'
              >
                {currentSelectedIndividual.individual_entrepreneur}
              </p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='individualException w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                />
              </svg>
            </div>
            <div
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className='notificationException h-8 w-8 overflow-visible rounded-full bg-gray-100 flex items-center cursor-pointer justify-center hover:bg-gray-300 duration-300 transition ease-in-out'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 text-slate-800 notificationException'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                />
              </svg>
            </div>
            <Individual
              open={individualOpen}
              setOpen={setIndividualOpen}
            />
            <Notifications
              open={notificationsOpen}
              setOpen={setNotificationsOpen}
            />
            {isAuth && (
              <Button
                type={'submit'}
                text={'Выйти'}
                handler={async () => {
                  logOut()
                  await router.push('/')
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Sidebar
        setOpen={setSidebarOpen}
        open={sidebarOpen}
      />
    </>
  )
}

export default Navbar

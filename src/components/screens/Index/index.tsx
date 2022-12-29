import { FC } from 'react'

import useAuth from '../../../hooks/useAuth'

import { AbsoluteCenteredContainer } from '../../ui/Container'
import AuthForm from './components/AuthForm'

const Index: FC = () => {
  const { isAuth, user } = useAuth()

  return (
    <AbsoluteCenteredContainer>
      {isAuth ? (
        <h1 className='text-4xl text-center'>Добро пожаловать, 123.</h1>
      ) : (
        <>
          <h1 className='text-3xl text-center font-medium mb-4'>Авторизация</h1>
          <AuthForm />
        </>
      )}
    </AbsoluteCenteredContainer>
  )
}

export default Index

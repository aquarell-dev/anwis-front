import { useEffect, useState } from 'react'
import { useTypedSelector } from './useTypedSelector'

type UserState = {
  user: string | null | undefined
  isAuth: boolean
}

const useAuth = () => {
  const user = useTypedSelector(state => state.auth)

  const [userState, setUserState] = useState({} as UserState)

  useEffect(() => setUserState({ ...user, isAuth: !!user.token }), [])

  // avoid hydration error

  return userState
}

export default useAuth

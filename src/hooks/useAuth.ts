import { useTypedSelector } from './useTypedSelector';

const useAuth = () => {
  const user = useTypedSelector(state => state.auth);

  return {
    isAuth: !!user.token,
    user: user.user
  }
};

export default useAuth;

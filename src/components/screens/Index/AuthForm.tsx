import { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import { IRHFInput, IUserCredentials } from './index.types';

import { IndigoButton } from '../../ui/Button';

import { useLoginMutation } from '../../../features/auth/authApiSlice';
import { useActions } from '../../../hooks/useActions';

export const RHFInput: FC<IRHFInput> = ({ label, register, required, ...inputProps }) =>
  <input
    className='py-2 px-4 outline-none bg-gray-100 shadow-md rounded-md'
    {...inputProps}
    {...register(label, { required })}
  />;

type UserData = {
  access: string;
}

const AuthForm: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUserCredentials>();

  const [errorMessage, setErrorMessage] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const { setCredentials } = useActions();

  const onSubmit = async (data: IUserCredentials) => {
    setErrorMessage('');
    try {
      const userData: unknown = await login({ ...data }).unwrap();
      setCredentials({ accessToken: (userData as UserData).access, user: data.username })
    } catch (err) {
      const error = err as { status: number };
      if (error.status === 400) {
        setErrorMessage('Не указан логин или пароль.')
      } else if(error.status === 401) {
        setErrorMessage('Пользователь не найден.')
      } else {
        setErrorMessage('Неизвестная ошибка')
      }
    }
  };

  return (
    <form className='flex flex-col space-y-4 items-center' onSubmit={handleSubmit(onSubmit)}>
      <RHFInput label={'username'} register={register} required placeholder={'Логин'}/>
      <RHFInput label={'password'} register={register} required placeholder={'Пароль'}/>
      {(errors.username || errors.password) && <p className='text-red-500 font-medium'>Все поля обязательны</p>}
      {errorMessage && <p className='text-red-500 font-medium'>{errorMessage}</p>}

      <IndigoButton type={'submit'} text={'Авторизоваться'} handler={() => {
      }}/>
    </form>
  );
};

export default AuthForm;

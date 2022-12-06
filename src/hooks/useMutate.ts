import useNotifications from './useNotifications'

type MutateOptions = {
  successMessage?: string
  errorMessage?: string
  onFail?: () => Promise<void>
  onSuccess?: () => Promise<void>
}

const useMutate = <T = void>() => {
  const { notifyError, notifySuccess } = useNotifications()

  return async (mutate: () => Promise<T>, options?: MutateOptions) => {
    try {
      await mutate()
      if (options?.successMessage) notifySuccess(options?.successMessage)
      if (options?.onSuccess) await options?.onSuccess()
    } catch (e) {
      if (options?.errorMessage) notifyError(options?.errorMessage)
      if (options?.onFail) await options?.onFail()
    }
  }
}

export default useMutate

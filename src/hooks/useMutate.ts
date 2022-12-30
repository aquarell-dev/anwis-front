import useNotifications from './useNotifications'

export type MutateOptions<T = void, V = void> = {
  successMessage?: string
  errorMessage?: string
  onFail?: () => T
  onSuccess?: () => V
}

const useMutate = <SuccessReturn = void, FailReturn = void>() => {
  const { notifyError, notifySuccess } = useNotifications()

  return async <T>(mutate: () => T, options?: MutateOptions<SuccessReturn, FailReturn>) => {
    try {
      const result = await mutate()
      if (options?.successMessage) notifySuccess(options?.successMessage)
      if (options?.onSuccess) await options?.onSuccess()
      return result
    } catch (e) {
      if (options?.errorMessage) notifyError(options?.errorMessage)
      if (options?.onFail) await options?.onFail()
    }
  }
}

export default useMutate

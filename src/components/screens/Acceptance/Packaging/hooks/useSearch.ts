import useNotifications from '../../../../../hooks/useNotifications'

type SearchInputResult = 'barcode' | 'box' | 'staff'

const useSearch = () => {
  const { notifyError } = useNotifications()

  return (input: string): SearchInputResult | null => {
    if (input.match(/^\d{1,4}$/)) return 'staff'

    if (input.match(/^\d{5,}$/)) return 'barcode'

    if (input.match(/^\d{1,3}-\d{1,3}-\d{1,3}$/)) return 'box'

    notifyError('Значение не распознано')

    return null
  }
}

export default useSearch

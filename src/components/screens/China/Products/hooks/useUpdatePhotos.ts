import useNotifications from '../../../../../hooks/useNotifications'

import { useFetchPhotosMutation } from '../../../../../store/api/acceptance.product.api'

const useUpdatePhotos = () => {
  const [fetchPhotos, { isLoading }] = useFetchPhotosMutation()
  const { notifyError, notifySuccess } = useNotifications()

  const fetchSelectedPhotos = async (articles: string[]) => {
    try {
      await fetchPhotos({ articles })
      notifySuccess('Фото обновлены')
    } catch {
      notifyError('Фото не обновлены')
    }
  }

  return { fetchSelectedPhotos, photosLoading: isLoading }
}

export default useUpdatePhotos

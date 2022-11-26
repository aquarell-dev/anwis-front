import useNotifications from '../../../../../hooks/useNotifications'

import { useLazyGetBoxByBoxNumberQuery } from '../../../../../store/api/acceptance.box.api'
import { AcceptanceProductSpecification } from '../../../../../types/acceptance.types'

const useSearchProduct = (specifications: AcceptanceProductSpecification[]) => {
  const [
    searchByBox,
    {
      data: specificationByBox,
      isLoading: specificationByBoxLoading,
      isFetching: specificationByBoxFetching
    }
  ] = useLazyGetBoxByBoxNumberQuery()

  const { notifyError, notifySuccess } = useNotifications()

  const searchProductByBox = async (box: string) => {
    try {
      await searchByBox(box).unwrap()
    } catch (e) {
      notifyError('Коробка не была найдена')
    }
  }

  const getSpecification = () =>
    specificationByBox &&
    specifications.find(specification => specification.id === specificationByBox?.specification)

  return {
    searchProductByBox,
    getSpecification,
    specificationByBoxLoading: specificationByBoxLoading || specificationByBoxFetching
  }
}

export default useSearchProduct

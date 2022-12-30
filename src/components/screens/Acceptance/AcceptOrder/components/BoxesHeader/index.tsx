import { FC } from 'react'

import ProductHeaders from '../ProductHeaders'

const BoxesHeader: FC = () => {
  return (
    <ProductHeaders>
      <p className='pr-4 w-24 border-r border-slate-800'>Фкт. Кол.</p>
      <p className='pr-4'>Коробки</p>
    </ProductHeaders>
  )
}

export default BoxesHeader

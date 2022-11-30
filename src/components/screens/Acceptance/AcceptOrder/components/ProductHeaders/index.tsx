import { FC } from 'react'

const ProductHeaders: FC = ({ children }) => {
  return (
    <div className='flex items-center space-x-2 py-2 px-4 border-b border-slate-800 children__no_shrink'>
      <p className='pr-4 w-52 border-r border-slate-800'>Название</p>
      <p className='pr-4 w-10 border-r border-slate-800'>К</p>
      <p className='pr-4 w-52 border-r border-slate-800'>Артикул Поставщика</p>
      <p className='pr-4 w-20 border-r border-slate-800'>Размер</p>
      {children}
    </div>
  )
}

export default ProductHeaders

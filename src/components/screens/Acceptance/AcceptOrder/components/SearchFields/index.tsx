import { FC } from 'react'
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { TbBox } from 'react-icons/tb'

import useMethod from '../../hooks/useMethod'

import { SetState } from '../../../../../../utils/types'
import { IndigoButton } from '../../../../../ui/Button'
import { FancyInput } from '../../../../../ui/Input'
import { Method } from '../../../types'

const SearchFields: FC<{
  method: Method
  setMethod: SetState<Method>
  searchProductByBox: (box: string) => Promise<void>
  searchProductByBarcode: (barcode: string) => Promise<void>
}> = ({ searchProductByBox, searchProductByBarcode, method, setMethod }) => {
  const { search, setValue, value } = useMethod({
    method,
    setMethod,
    searchProductByBarcode,
    searchProductByBox
  })

  return (
    <div className='flex flex-col space-y-4'>
      <p>Поиск по: {method}</p>
      <div className='flex space-x-2 items-end'>
        <FancyInput
          type='text'
          value={value}
          handler={e => setValue(e.target.value)}
          placeholder={'Коробка или Штрих-Код'}
          showLabel
          customWidth='w-48'
          onKeyDown={async e => e.key === 'Enter' && (await search())}
        />
        <IndigoButton
          type='button'
          handler={async () => await search()}
          customWidth='w-16'
        >
          {method === 'barcode' ? <AiOutlineFieldNumber size={22} /> : <TbBox />}
        </IndigoButton>
      </div>
    </div>
  )
}

export default SearchFields

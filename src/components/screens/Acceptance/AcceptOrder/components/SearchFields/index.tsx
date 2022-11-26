import { FC, useEffect, useState } from 'react'
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { TbBox } from 'react-icons/tb'

import { IndigoButton } from '../../../../../ui/Button'
import { FancyInput } from '../../../../../ui/Input'

type Method = 'barcode' | 'box'

const SearchFields: FC<{
  searchProductByBox: (box: string) => Promise<void>
}> = ({ searchProductByBox }) => {
  const [method, setMethod] = useState<Method>('box')
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!value) return

    const boxMethod = (value.match(new RegExp('^\\d{1,3}-\\d{1,3}-\\d{1,3}$')) || []).length > 0

    if (boxMethod) return setMethod('box')

    return setMethod('barcode')
  }, [value])

  return (
    <div className='flex flex-col space-y-4'>
      <p>Поиск по: {method}</p>
      <div className='flex space-x-2 items-end'>
        <FancyInput
          value={value}
          handler={e => setValue(e.target.value)}
          placeholder={'Коробка или Штрих-Код'}
          showLabel
          customWidth='w-48'
        />
        <IndigoButton
          type='button'
          handler={async () => (method === 'barcode' ? null : await searchProductByBox(value))}
          customWidth='w-16'
        >
          {method === 'barcode' ? <AiOutlineFieldNumber size={22} /> : <TbBox />}
        </IndigoButton>
      </div>
    </div>
  )
}

export default SearchFields

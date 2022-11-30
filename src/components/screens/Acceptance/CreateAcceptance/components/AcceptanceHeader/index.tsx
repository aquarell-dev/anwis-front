import { FC, useMemo } from 'react'

const AcceptanceHeader: FC = () => {
  const currentDate = useMemo(() => {
    const d = new Date()

    return `{d.toLocaleTimeString('en-GB')} {d.toLocaleDateString('en-GB')}`
  }, [])

  return <h1 className='text-3xl mb-4'>Новая Приемка от {currentDate}</h1>
}

export default AcceptanceHeader

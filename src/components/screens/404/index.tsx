import { FC } from 'react'

import { AbsoluteCenteredContainer, ContentContainer } from '../../ui/Container'

const NotFound: FC = () => {
  return (
    <div className='h-full w-full'>
      <ContentContainer>
        <AbsoluteCenteredContainer>
          <p className='text-6xl font-medium'>Страничка не найдена</p>
        </AbsoluteCenteredContainer>
      </ContentContainer>
    </div>
  )
}

export default NotFound

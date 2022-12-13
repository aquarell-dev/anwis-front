import React, { FC, useRef } from 'react'
import { SpinnerComponent } from 'react-element-spinner'
import Slider, { Settings } from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { useListWorkSessionsByTodayQuery } from '../../../../../../store/api/session.api'
import { StaffMember } from '../../../../../../types/acceptance.types'
import PackagingMember from '../PackagingMember'
import { LeftArrow, RightArrow } from './components/Arrows'
import SliderItem from './components/SliderItem'

const PackagingSlider: FC<{ members: StaffMember[] }> = ({ members }) => {
  const slider = useRef(null)

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    // @ts-ignore
    nextArrow: <RightArrow onClick={() => slider?.current?.slickPrev()} />,
    // @ts-ignore
    prevArrow: <LeftArrow onClick={() => slider?.current?.slickPrev()} />,
    centerMode: false
  }

  const { data, isLoading } = useListWorkSessionsByTodayQuery(null)

  return (
    <div className='py-4 px-12 border-t border-slate-800 w-full min-h-[250px]'>
      <SpinnerComponent
        loading={isLoading}
        position='centered'
        backgroundColor='grey'
      />
      <Slider
        className='h-[500px] rounded-md shadow-md border flex justify-center items-center text-black'
        {...settings}
        ref={slider}
      >
        {members
          .filter(member => member.box || member.time_session)
          .map(member => (
            <PackagingMember
              sessions={data}
              member={member}
              key={member.id}
            />
          ))}
      </Slider>
    </div>
  )
}

export default PackagingSlider

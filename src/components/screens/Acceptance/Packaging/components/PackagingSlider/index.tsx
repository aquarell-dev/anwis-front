import React, { FC, useRef } from 'react'
import Slider, { Settings } from 'react-slick'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

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

  return (
    <div className='py-4 px-12 border-t border-slate-800 w-full'>
      <Slider
        className='h-80 rounded-md shadow-md border flex justify-center items-center text-black'
        {...settings}
        ref={slider}
      >
        {members.map(member => (
          <PackagingMember
            member={member}
            key={member.id}
          />
        ))}
      </Slider>
    </div>
  )
}

export default PackagingSlider

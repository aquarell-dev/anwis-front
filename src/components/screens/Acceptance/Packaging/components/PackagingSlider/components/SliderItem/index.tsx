import React, { FC, HTMLProps, ReactNode } from 'react'

const SliderItem: FC<Pick<HTMLProps<HTMLElement>, 'className'> & { children: ReactNode }> = ({
  children,
  className
}) => {
  return (
    <div
      className={
        className ?? 'block w-full h-[650px] lg:h-[500px] flex flex-col justify-center items-center'
      }
      style={{
        background: 'linear-gradient(180deg, rgb(245, 145, 212) 0%, rgb(194, 170, 189))',
        boxShadow: '2px 4px 6px rgba(194, 192, 192, 0.25)'
      }}
    >
      {children}
    </div>
  )
}

export default SliderItem

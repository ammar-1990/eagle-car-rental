import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    title:string,
    className?:string
}

const Heading = ({className,title}: Props) => {
  return (
    <p className={cn('font-[500] text-[22px] tracking-[0.5px] text-[#1F384C]',className)}>{title}</p>
  )
}

export default Heading
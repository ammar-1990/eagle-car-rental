import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
    title:string;
    description?:string
    className?:string
    titleClassName?:string
    descriptionClassName?:string
}

const NoResult = ({title,className,description,titleClassName,descriptionClassName}: Props) => {
  return (
    <div className={cn('w-full min-h-[200px] border rounded-md flex items-center justify-center gap-1 bg-slate-50',className)}>
        <p className={cn('text-3xl',titleClassName)}>{title}</p>
        {description && <p className={cn('text-md',descriptionClassName)}>{description}</p>}
    </div>
  )
}

export default NoResult
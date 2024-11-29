import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { ButtonHTMLAttributes } from 'react'

type Props = {
    className?:string
    title:string,
    href:string
} & ButtonHTMLAttributes<HTMLButtonElement>

const LinkButton = ({href,title,className}: Props) => {
  return (
    <Button className={cn('',className)} variant={'site'} asChild>
        <Link href={href}>
        {title}
        </Link>
    </Button>
  )
}

export default LinkButton
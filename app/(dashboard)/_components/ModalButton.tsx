'use client'

import { ModalInputs, useModal } from "@/app/zustand"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

type Props = {
    className?:string,
    modalInputs:ModalInputs
    title:string
}&ButtonHTMLAttributes<HTMLButtonElement>

const ModalButton = ({className,modalInputs,title}: Props) => {
    const {setOpen} = useModal()
    const handleClick = ()=>{
        setOpen(modalInputs)
    }
  return (
    <Button variant={'site'} className={cn('',className)} onClick={handleClick}>{title}</Button>
  )
}

export default ModalButton
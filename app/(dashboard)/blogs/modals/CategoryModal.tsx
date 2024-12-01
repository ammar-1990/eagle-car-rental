'use client'

import { useModal } from "@/app/zustand"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Heading from "../../_components/Heading"

type Props = {}

const CategoryModal = (props: Props) => {
    const {open,setClose,modalInputs} = useModal()

 
    const isOpen = open && modalInputs?.modal === 'category'
    if(!isOpen) return 
    const data = modalInputs.data
    const title = data ? `Update ${data.title}` : 'Create Blog Category'
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
 
    <DialogContent>
      <DialogHeader>
        <DialogTitle><Heading title="Blog Category"/></DialogTitle>
        <DialogDescription>
        {title}
        </DialogDescription>
      </DialogHeader>
      form
    </DialogContent>
  </Dialog>
  )
}

export default CategoryModal
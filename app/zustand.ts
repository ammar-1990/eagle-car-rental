import { Blog, BlogCategory } from '@prisma/client'
import { create } from 'zustand'

type ModalStore = {
  open: boolean
  modalInputs:ModalInputs | null
  setOpen:(data:ModalInputs)=>void
  setClose:()=>void
}

export type ModalInputs = 
{
modal:'category',
data?:Partial<BlogCategory>
} | 
{
    modal:'blog',
    data?:Partial<Blog>
}  

export const useModal = create<ModalStore>()((set) => ({
open:false,
modalInputs:null,
setOpen:(modalInputs:ModalInputs)=>set((state)=>({open:true,modalInputs})),
setClose:()=>set((state)=>({open:false,modalInputs:null})),
}))
'use client'

import { BlogCategory } from "@prisma/client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { errorToast, log } from "@/lib/utils"
import { useModal } from "@/app/zustand"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createCategory } from "../actions/createCategory"
import { updateCategory } from "../actions/updateCategory"
import { categorySchema } from "../schemas"
 


export const useCategory = (category?:BlogCategory)=>{
    const {setClose} = useModal()
    const router = useRouter()
    
 
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          title:category ? category.title : "",
        },
      })

    async  function onSubmit(values: z.infer<typeof categorySchema>) {
        let res
        try {           
            if(!category){ 
                res = await  createCategory(values)
            }else{
                res = await updateCategory({data:values,id:category.id})
            }

            if(!res.success){
            
                errorToast(res.message)
            }else{
                setClose()
                router.refresh()
                toast.success(res.message)
            }
            log({messages:[JSON.stringify(res)]})
            
        } catch (error) {
            errorToast()
            log({messages:[error],type:'error'})
        }
    
      }

    return {form, onSubmit}
}
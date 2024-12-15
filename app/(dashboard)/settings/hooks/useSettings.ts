"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { settingsSchema } from "../schemas"
import { Settings } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { errorToast } from "@/lib/utils"
import { updateSettings } from "../actions/updateSettings"
import { toast } from "sonner"

export const useSettings = (settings:Settings | null)=>{
    
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            companyName:settings?.companyName ?? '',
            email:settings?.email ?? '',
            password:settings?.password ?? '',
            phoneNumber:settings?.phoneNumber ?? '',
            whatsAppNumber:settings?.whatsAppNumber ?? ''
        },
      })
     
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof settingsSchema>) {
         startTransition(async()=>{
          
           try {  
            const res = await updateSettings(values)

            if(!res.success){
              errorToast(res.message)
            }else{
              toast.success(res.message)
              router.refresh()
            }
            
           } catch (error) {
            errorToast()
           }
         })
    
      }


      return {
        onSubmit, form, pending
      }
}
'use client'

import { useEffect, useState } from "react"
import CategoryModal from "../(dashboard)/blogs/_components/modals/CategoryModal"
import DeleteModal from "@/components/DeleteModal"

type Props = {}

const ModalsProvider = (props: Props) => {

    const [mounted, setMounted] = useState(false)
    useEffect(()=>{
setMounted(true)
    },[])
    if(!mounted) return  
  return (
    <>
    <CategoryModal />
    <DeleteModal/>
    </>
  )
}

export default ModalsProvider
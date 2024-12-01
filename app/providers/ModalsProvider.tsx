'use client'

import { useEffect, useState } from "react"
import CategoryModal from "../(dashboard)/blogs/modals/CategoryModal"

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
    </>
  )
}

export default ModalsProvider
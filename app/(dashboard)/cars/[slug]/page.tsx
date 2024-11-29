 
import React from 'react'
import Heading from '../../_components/Heading'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
    params:Promise<{slug:string}>
}

const CarPage = async({params}: Props) => {
  const {slug} = await params
    const car = await prisma.car.findUnique({
        where:{
            slug:slug
        }
    })
    if(!car && slug !=='new') return notFound()
    const title = car ? `Update ${car.subTitle}` : 'Create New Car'
  return (
    <div>
           <Heading title={title} />
    </div>
  )
}

export default CarPage
 
import React from 'react'
import Heading from '../../_components/Heading'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
    params:{slug:string}
}

const CarPage = async({params}: Props) => {
    const car = await prisma.car.findUnique({
        where:{
            slug:params.slug
        }
    })
    if(!car && params.slug !=='new') return notFound()
    const title = car ? `Update ${car.subTitle}` : 'Create New Car'
  return (
    <div>
           <Heading title={title} />
    </div>
  )
}

export default CarPage
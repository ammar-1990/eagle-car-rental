 
import React from 'react'
import Heading from '../../_components/Heading'
import prisma from '@/lib/prisma'

type Props = {
    params:{slug:string}
}

const page = async({params}: Props) => {
    const car = await prisma.car.findUnique({
        where:{
            slug:params.slug
        }
    })

    const title = car ? `Update ${car.subTitle}` : 'Create New Car'
  return (
    <div>
           <Heading title={title} />
    </div>
  )
}

export default page
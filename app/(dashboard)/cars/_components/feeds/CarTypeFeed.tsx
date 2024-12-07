 
import prisma from '@/lib/prisma'
import React from 'react'
 
import NoResult from '@/components/NoResult'
import CarTypeCard from '../cards/CarTypeCard'

type Props = {}

const CarTypeFeed = async(props: Props) => {
    const carTypes = await prisma.carType.findMany({orderBy:{
      createdAt:'desc'
    }})

  return (
    <div>
        {!carTypes.length && <div className='mt-2'><NoResult title='No Car Types' description='Create Car Types For Your Cars' /></div>}
        {!!carTypes.length && <div className='min-h-[100px] flex gap-2 items-center flex-wrap mt-2'>
      {carTypes.map(type=><div key={type.id}><CarTypeCard carType={type} /></div>)}
    </div>}
    </div>
 
  )
}

export default CarTypeFeed
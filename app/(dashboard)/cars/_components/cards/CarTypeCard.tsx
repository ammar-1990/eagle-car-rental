'use client'
import SuperButton from '@/components/SuperButton'
import { BlogCategory, CarType } from '@prisma/client'
import { Delete, Edit } from 'lucide-react'
import React from 'react'
import { deleteCarType } from '../../actions/deleteCarType'
 

type Props = {
    carType:CarType
}

const CarTypeCard = ({carType}: Props) => {
  return (
    <div className='border rounded-md flex items-center  flex-col p-2 gap-2 w-fit'>
        {<p className='capitalize text-sm font-semibold'>{carType.title}</p>}
        <div className='flex items-center gap-1'>
        <SuperButton variant='site'  buttonType='modalButton' modalInputs={{modal:'carType',data:carType}} Icon={<Edit className='icon'/>} />
        <SuperButton variant='destructive'  buttonType='modalButton' modalInputs={{modal:'delete',function:()=>deleteCarType(carType.id)}} Icon={<Delete className='icon'/>} />
        </div>
     
    </div>
  )
}

export default CarTypeCard
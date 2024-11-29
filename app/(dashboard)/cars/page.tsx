import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Heading from '../_components/Heading'
import { wait } from '@/lib/utils'

type Props = {}

const CarsPage = async(props: Props) => {
 
  return (
    <div>
       <Heading title="Cars" />
    </div>
  )
}

export default CarsPage
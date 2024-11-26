import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Heading from '../_components/Heading'

type Props = {}

const page = async(props: Props) => {

  return (
    <div>
       <Heading title="Cars" />
    </div>
  )
}

export default page
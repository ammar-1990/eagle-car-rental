import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Heading from '../_components/Heading'
import { wait } from '@/lib/utils'

type Props = {}

const page = async(props: Props) => {
  await wait()
  return (
    <div>
       <Heading title="Cars" />
    </div>
  )
}

export default page
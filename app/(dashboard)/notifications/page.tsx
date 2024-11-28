import React from 'react'
import Heading from '../_components/Heading'
import { wait } from '@/lib/utils'

type Props = {}

const page = async(props: Props) => {
  await wait()
  return (
    <div>
       <Heading title="Notifications" />
    </div>
  )
}

export default page
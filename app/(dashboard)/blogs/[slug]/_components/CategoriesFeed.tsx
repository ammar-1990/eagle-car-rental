import Heading from '@/app/(dashboard)/_components/Heading'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const CategoriesFeed = async(props: Props) => {
    const categories = await prisma.blogCategory.findMany()

  return (
    <div className='min-h-[100px]'>
      
    </div>
  )
}

export default CategoriesFeed
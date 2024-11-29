import Heading from '@/app/(dashboard)/_components/Heading'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const BlogsFeed = async(props: Props) => {
    const blogs = await prisma.blog.findMany()

  return (
    <div className='min-h-[200px]'>
      
    </div>
  )
}

export default BlogsFeed
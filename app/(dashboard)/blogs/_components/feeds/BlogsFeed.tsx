
 
import NoResult from '@/components/NoResult'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {}

const BlogsFeed = async(props: Props) => {
    const blogs = await prisma.blog.findMany()

  return (
    <div className='min-h-[200px]'>
      {!blogs.length && <div className='mt-2'><NoResult title='No BLogs' /></div>}
    </div>
  )
}

export default BlogsFeed
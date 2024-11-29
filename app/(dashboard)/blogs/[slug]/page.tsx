import prisma from '@/lib/prisma'
import React from 'react'
import Heading from '../../_components/Heading'
import { notFound } from 'next/navigation'

type Props = {params:{
    slug:string
}}

const BlogPage =async ({params}: Props) => {
    const blog = await prisma.blog.findUnique({
        where:{
            slug:params.slug
        }
    })

    if(!blog && params.slug !=='new') return notFound()

    const title = blog ? `Update ${blog.title}` : 'Create New blog'
  return (
    <div>
           <Heading title={title} />
    </div>
  )
}

export default BlogPage
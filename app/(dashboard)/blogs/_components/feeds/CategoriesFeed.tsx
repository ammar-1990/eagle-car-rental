 
import prisma from '@/lib/prisma'
import React from 'react'
import CategoryCard from '../cards/CategoryCard'

type Props = {}

const CategoriesFeed = async(props: Props) => {
    const categories = await prisma.blogCategory.findMany({orderBy:{
      createdAt:'desc'
    }})

  return (
    <div className='min-h-[100px] flex gap-2 items-center flex-wrap mt-2'>
      {categories.map(category=><CategoryCard key={category.id} category={category} />)}
    </div>
  )
}

export default CategoriesFeed
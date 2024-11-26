 
import React from 'react'
import Aside from './_components/Aside'

type Props = {children:React.ReactNode}

const layout = ({children}: Props) => {
  return (
    <div className='flex h-full'>
   <Aside />
      <main className='flex-1 p-[35px]   overflow-y-auto'>
      {children}
      </main>
      
    </div>
  )
}

export default layout
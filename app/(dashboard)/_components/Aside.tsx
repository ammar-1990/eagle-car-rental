import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavList from './NavList'

type Props = {}

const Aside = (props: Props) => {
  return (
    <aside className='w-[240px] bg-site-primary p-[24px] flex flex-col gap-[8px]'>
    {/* logo */}
    <Link href={'/'}>
    <div className='relative w-full aspect-video '>
    <Image src={'/Logo.png'} className='object-contain' fill  alt='Logo' />
    </div>
    </Link>
    <NavList/>
    </aside>
  )
}

export default Aside
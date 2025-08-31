'use client'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import Logo from '../../images/logo.svg'
const DashHeader = () => {
  return (
    <div className='bg-white shadow-md p-4 flex justify-between items-center'>
      <p onClick = {()=>window.location.href="/"} className='text-2xl font-bold text-blue-900 flex items-center gap-2 cursor-pointer'>
      <Image src={Logo} alt="logo" width={50} height={50}  />
PreLearn

      </p>
      
      <UserButton/>

    </div>
  )
}

export default DashHeader
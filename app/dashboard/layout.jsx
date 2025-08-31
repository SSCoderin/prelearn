import React from 'react'
import SideBar from './_component/SideBar'
import DashHeader from './_component/DashHeader'

const Dashboard = ({children}) => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
        <div className='md:w-64 hidden md:block fixed h-full bg-white shadow-lg'>
            <SideBar/>
        </div>
        <div className='w-full md:ml-64 flex flex-col'>
            <DashHeader/>
            <div className='p-10 flex-grow'>{children}</div>
        </div>
    </div>
  )
}

export default Dashboard
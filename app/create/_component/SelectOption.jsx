"use client"
import React, { useState } from 'react'
import other from '../../images/other.png'
import exam from '../../images/exam.png'
import coding from '../../images/coding.jpg'
import interview from '../../images/interview.png'
import practice from '../../images/practice.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const SelectOption = ({selectStudyType}) => {
    const Select  = [
        {
            name:'Exam',
            icon: exam

        },
        {
            name:'Job Interview',
            icon: interview
        },
        {
            name :" Practice Prep",
            icon: practice
        },
        {
            name : "Coding Prep",
            icon: coding
        },
        {
         name: "Other",
         icon: other   
        }
    ]
    const [selected , setSelected ] =useState(null);
  return (
    <div>
    <div className='flex flex-col justify-center items-center border-2 border-gray-200 rounded-lg p-10 shadow-lg max-w-6xl mx-auto'>
        <h1 className='font-bold text-2xl text-center mb-8 text-gray-800'>
            For Which Subject You Want To Create Your Personal Study Material
        </h1>
        <div className='flex items-center justify-center flex-wrap gap-6'>
            {
                Select.map((element, index) => {
                    return(
                        <div onClick={()=>{setSelected(element.name);selectStudyType(element.name)}} className={`flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg w-[180px] h-[200px] hover:shadow-xl transition-all duration-300 hover:border-blue-500 cursor-pointer hover:bg-slate-100 ${element?.name == selected&& 'border-blue-800 bg-yellow-400' }`} key={index}>
                            <Image src={element.icon} alt={element.name} className='w-24 h-24 object-contain mb-4 hover:animate-pulse transition-all duration-50' />
                            <div>
                                <h1 className='text-lg font-semibold text-center text-gray-700'>{element.name}</h1>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        
    </div>

    </div>
  )
}

export default SelectOption
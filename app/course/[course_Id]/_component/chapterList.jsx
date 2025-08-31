import React from 'react'

const ChapterList = ({courseData}) => {
  return (
    <div className="my-10 md:mx-36 lg:mx-40 ">
        <h1 className="text-2xl font-semibold mb-4">Chapter List</h1>
        {courseData.map((course, index) => (
        <div key={index} className="border rounded-lg p-4 mb-2 hover:border-blue-500  hover:bg-blue-100 font-bold">
          {course.chapterTitle}
        </div>
      ))}
    </div>
  )
}

export default ChapterList
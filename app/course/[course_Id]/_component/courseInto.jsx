import React from "react";
import Image from "next/image";
import ImgCourse from "../../../images/course.jpg";
import { Progress } from "@/components/ui/progress";

const CourseInto = ({ courseSummary, length }) => {
  return (    <div className="flex flex-col gap-4 p-6 border rounded-xl shadow-lg bg-white">
      <div className="flex items-center gap-4 justify-center">
        <div className="relative w-[200px] h-[150px]">
          <Image
            src={ImgCourse}
            alt="course"
            fill
            className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="font-bold">{courseSummary}</span>
        </div>
        
      </div>
      <div className="flex items-center justify-start">
          <span className="font-bold">Total Chapters : {length}</span>
        </div>
      <Progress value={1} max={300} className="h-2" />
    </div>
  );
};

export default CourseInto;
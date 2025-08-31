"use client";
import React from "react";
import ImgCourse from "../../images/course.jpg";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
const CourseItemCard = ({ course }) => {
  return (
    <div>
      <div className="flex flex-col gap-3 border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:border-blue-500 max-w-[300px]">
        <div className="relative overflow-hidden rounded-lg h-[200px]">
          <Image
            src={ImgCourse}
            alt="course"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {course.topic}
          </h2>
          <p className="text-sm line-clamp-2 text-gray-600">
            {course.coursedata.courseSummary}
          </p>
          <div className="py-2">
            <Progress value={1} max={300} className="h-2" />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            onClick={() => (window.location.href = `/course/${course._id},${course.studyType},${course.topic},${course.difficulty},${course.coursedata.courseSummary}`)}
          >
            Continue Learning
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default CourseItemCard;

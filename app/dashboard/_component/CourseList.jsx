"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseItemCard from "./CourseItemCard";

const CourseList = () => {
  const [courseDataList, setCourseDataList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    if (user?.id) {
    const response = await axios.post("/api/courses", {
      userID: user?.id,
    });
    console.log(response.data.data);
    setCourseDataList(response.data.data);
  };
}


  return (
    <>
      <div className="py-10 text-2xl font-bold">Your Study Material</div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {courseDataList.map((course, index) => {          return(
            <CourseItemCard course = {course} key ={index}/>
          )
        })}
      </div>
    </>
  );
};

export default CourseList;

// "use client";
// import React, { useEffect, useState } from "react";
import WelcomeBanner from "./_component/WelcomeBanner";
// import axios from "axios";
// import { useUser } from "@clerk/nextjs";
// import CourseItemCard from "./_component/CourseItemCard";
import CourseList from "./_component/CourseList";
// import CourseList from './_component/CourseList'

const DashboardPage = () => {
  // const [courseDataList, setCourseDataList] = useState([]);
  // const { user } = useUser();
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     if (user?.id) {
  //       const response = await axios.post("/api/courses", {
  //         userID: user.id,
  //       });
  //       console.log(response.data.data);
  //       setCourseDataList(response.data.data);
  //     }
  //   };
  //   fetchCourses();
  // }, [user]);
  return (
    <div>
      <WelcomeBanner />
      <CourseList/>
      {/* <div className="py-10 text-2xl font-bold">Your Study Material</div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {courseDataList.map((course, index) => {
          return <CourseItemCard course={course} key={index} />;
        })}
      </div>{" "} */}
    </div>
  );
};

export default DashboardPage;

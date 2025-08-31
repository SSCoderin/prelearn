"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashHeader from "@/app/dashboard/_component/DashHeader";
import CourseInto from "./_component/courseInto";
import StudyMaterial from "./_component/studyMaterial";
import ChapterList from "./_component/chapterList";

const Course = () => {
  const params = useParams();
  const pathSegments = params.course_Id.split("%2C");
  const course_Id = pathSegments[0];
  const courseSummary = decodeURIComponent(pathSegments.slice(4).join(","));
  console.log("Course ID:", course_Id);
  console.log("Course Summary:", courseSummary);

  const [courseData, setCourseData] = useState([]);
  const [flashcardData, setFlashcardData] = useState([]); 

  const fetchCourse = async () => {
    console.log("Fetching course...");
    try {
      const response = await axios.get(`/api/courses?course_Id=${course_Id}`);
      console.log("Course data:", response.data);
      setCourseData(response.data.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      console.log("Fetching course completed.");
    }
  };

  const  fetchFlashcardData = async () => {
    try {
      const response = await axios.get(`/api/flashcard?course_Id=${course_Id}`);
      console.log("Flashcard data:", response.data);
      setFlashcardData(response.data.data);
    } catch (error) {
      console.error("Error fetching flashcard data:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchFlashcardData();
  }, []);
  return (
    <div>
      <div >
        <CourseInto courseSummary={courseSummary} length={courseData.length} />
      </div>
      <div>
        <StudyMaterial courseData={courseData} flashcardData={flashcardData} />
      </div>
      <div>
        <ChapterList courseData={courseData} />
      </div>
      
    </div>
  );
};

export default Course;

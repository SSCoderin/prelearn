"use client";
import React from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ViewNotes = () => {
  const params = useParams();
  const router = useRouter();
  const pathSegments = params.course_Id.split("%2C");
  const course_Id = pathSegments[0];
  const [courseData, setCourseData] = useState([]);
  const [stepCount, setStepCount] = useState(0);

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

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleNext = () => {
    if (stepCount < courseData.length - 1) {
      setStepCount(stepCount + 1);
    } else if (stepCount === courseData.length - 1) {
      router.replace(`/course/${params.course_Id}`);
    }
  };

  const handlePrevious = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handlePrevious}
            disabled={stepCount === 0}
            className="w-24"
          >
            Previous
          </Button>
          <div className="flex-1 flex gap-2">
            {courseData.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= stepCount ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <Button 
            onClick={handleNext}
            className="w-32 p-2"
          >
            {stepCount === courseData.length - 1 ? 'Go Back to Course' : 'Next'}
          </Button>
        </div>
        
        <div className="border rounded-lg shadow-sm">
          {courseData[stepCount] ? (
            <div
              className="p-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: (courseData[stepCount].notehtml).replace("```html", "" ).replace("```", "") }}
            />
          ) : (
            <div className="p-6 text-center text-gray-500">
              No content available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;

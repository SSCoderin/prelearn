"use client";
import React, { useState } from "react";
import SelectOption from "./_component/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_component/TopicInput";
import axios from "axios";
import { Loader } from "lucide-react";
import  { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);  
  const router = useRouter();
  const {user} = useUser();
  const HandleInput = (fieldName, fieldValue) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: fieldValue
    }));
  };

  const GenerateCourseOutline = async () => {
    setLoading(true);
    console.log(formData);
    console.log("calling api")
    try {
      console.log("sucess to call ")
      const response = await axios.post("/api/generate", {
        ...formData,
        userID: user?.id
      });
      console.log(response.data);
    } catch (error) {
      console.log("failes")
      console.error("Error generating course outline:", error);
    }finally{
      console.log("finally")
      setLoading(false);
      router.replace("/dashboard");
      toast("Course Outline Generated Successfully");
    }
  };

  return (
    
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-3xl text-blue-500">
        Start Building Your Personal Study Material
      </h1>
      <h2 className="font-bold text-xl pt-2 text-slate-500">
        Fill All The Details To Generate The Study Material
      </h2>
      <div className="mt-12">
        {step === 0 ? (
          <SelectOption
            selectStudyType={(value) => HandleInput("studyType", value)}
          />
        ) : (
          <TopicInput
            setTopicUser={(value) => HandleInput("topic", value)}
            setDifficulty={(value) => HandleInput("difficulty", value)}
          />
        )}
      </div>
      <div className="flex justify-evenly w-full mt-10">
        {step !== 0 && (
          <Button
            variant="outline"
            onClick={() => setStep(0)}
          >
            ← Previous
          </Button>
        )}
        {step === 0 ? (
          <Button onClick={() => setStep(1)}>
            Next →
          </Button>
        ) : (
          <Button onClick={GenerateCourseOutline}>{loading ? <Loader className="animate-spin"/> : "Generate"}</Button>
        )}
      </div>
    </div>
  );
};

export default Create;

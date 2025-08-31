'use client'
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopicInput = ({ setDifficulty, setTopicUser }) => {
   
  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-200 rounded-lg p-10 shadow-lgw-6 max-xl mx-auto">
    <div >
      <h1 className="font-bold text-2xl text-center mb-8 text-gray-800">
        {" "}
        Enter The Topic Or Create Your Personalized Study Material
      </h1>
      <Textarea placeholder='write your topic here' onChange= {(e)=> setTopicUser(e.target.value)} ></Textarea>
      
    </div>
    <div className="flex flex-col w-full justify-start mt-8"  >
    <h2 className="text-2xl font-bold mb-2">Select The Difficulty Level</h2>
    <Select onValueChange={(value)=>{setDifficulty(value)}}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select " />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
    </Select>
    </div>
    </div>
  );
};

export default TopicInput;

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import notes from "../../../images/notes.jpg";
import quiz from "../../../images/quiz.webp";
import flash from "../../../images/flash.png";
import question from "../../../images/question.jpg";

const StudyMaterial = ({ courseData , flashcardData }) => {
  const StudyOption = [
    {
      name: "Notes / Chapters",
      icon: notes,
      path: "/notes",
      dec: "Read notes and chapters",

      data: courseData,
    },
    {
      name: "Flash Cards",
      icon: flash,
      path: "/flashcards",
      dec: "Learn with flashcards",
      data: flashcardData,
    },
    {
      name: "Quiz",
      icon: quiz,
      path: "/quiz",
      dec: "Take quiz and test your knowledge",
      data: 0,
    },
    {
      name: "Questions/Answers",
      icon: question,
      path: "/questions",
      dec: "Ask questions and get answers",
      data: 0,
    },
  ];
  return (
    <div className="mt-10 mx-4 md:mx-36 lg:mx-40">
      <h2 className="text-2xl font-bold mb-6">Study Material</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {StudyOption.map((option, index) => {
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              {option.data?.length > 0 ? (
                <h1 className="w-fit bg-green-400 px-2 rounded-3xl">ready</h1>
              ) : (
                <h1 className="w-fit bg-gray-400 px-2 rounded-3xl">generate</h1>
              )}

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4">
                  <Image
                    src={option.icon}
                    alt={option.name}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">
                  {option.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm text-center mb-4">
                  {option.dec}
                </p>
                {option.data?.length > 0 ? (
                  <Button
                    onClick={() =>
                      (window.location.href =
                        window.location.href + option.path)
                    }
                    className="w-full text-sm"
                  >
                    View
                  </Button>
                ) : (
                  <Button
                  
                  onClick={() =>
                    (window.location.href =
                      window.location.href + option.path)
                  }
                  className="w-full text-sm bg-gray-500 ">
                    Generate
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudyMaterial;

"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import DemoBot from "./DemoBot";

const CodeDisplay = () => {
  const [results, setResults] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [callbot , setCallbot] = useState(false);

  const codeLines = [
    {
      question: "Sort the array [3, 0, 2, 5, -1, 4, 1] using quick sort.",
      code: {
        function:     "function quickSort(arr) {",
        condition:    "    if (arr.length <= 1) return arr;",
        define_variable1: "    const pivot = arr[Math.floor(arr.length / 2)];",
        define_variable2: "    const left = arr.filter(x => x < pivot);",
        define_variable3: "    const right = arr.filter(x => x > pivot);",
        define_variable4: "    const equal = arr.filter(x => x === pivot);",
        return:       "    return [...quickSort(left), ...equal, ...quickSort(right)];",
        end:         "}"
      },
      result: "[-1, 0, 1, 2, 3, 4, 5]",
    },
    {
      question: "Calculate the sum of digits in number 12345.",
      code: {
        function:     "function sumOfDigits(num) {",
        define_variable: "    let sum = 0;",
        while:        "    while (num > 0) {",
        calculation1: "        sum += num % 10;",
        calculation2: "        num = Math.floor(num / 10);",
        end:         "    }",
        return:      "    return sum;",
      },
      result: "15",
    },
    {
      question: "Calculate the factorial of 5.",
      code: {
        function:  "function factorial(n) {",
        condition: "    if (n === 0) return 1;",
        return:    "    return n * factorial(n - 1);",
        end:       "}"
      },
      result: "120",
    },
  ];
  const HandelHint = (number) => {
    setCallbot(true);
    console.log("bot is callled");
  };

  return (
    <div className=" flex flex-row  mx-auto py-4">
      {currentIndex}

      <Carousel className="bg-blue-100 max-w-6xl rounded-xl shadow-lg">
        <CarouselContent>
          {codeLines.map((codeLine, index) => {
            return (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-2 py-4 px-10 mx-10 ">
                  <h3 className="text-2xl font-bold text-red-400">
                    {codeLine.question}
                  </h3>
                  <div className="space-y-2">
                    {Object.values(codeLine.code).map((line, i) => (
                      <pre
                        key={i}
                        id={Object.keys(codeLine.code)[i]}
                        className="bg-blue-50 p-2 mt-4 rounded-md font-mono text-lg font-bold"
                      >
                        {line}
                      </pre>
                    ))}
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor={`answer-${index}`}
                      className="text-lg font-semibold"
                    >
                      Your Answer:
                    </label>
                    <textarea
                      id={`answer-${index}`}
                      className="w-full p-3 border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      placeholder="Enter your answer here..."
                    />
                    <button
                      onClick={() => {
                        const answer = document.getElementById(
                          `answer-${index}`
                        ).value;
                        if (answer === codeLine.result) {
                          setResults({
                            ...results,
                            [index]: {
                              isCorrect: true,
                              message: `Correct! The answer is ${codeLine.result}`,
                            },
                          });
                        } else {
                          setResults({
                            ...results,
                            [index]: {
                              isCorrect: false,
                              message: "Try again!",
                            },
                          });
                        }
                      }}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                      Submit
                    </button>
                    {results[index] && (
                      <p
                        className={`mt-3 font-medium ${
                          results[index].isCorrect
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {results[index].message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <Button
                    variant="outline"
                    className="font-bold text-black m-4"
                    onClick={() => {
                      setCurrentIndex(index);
                      HandelHint(index);
                    }}
                  >
                    💡Hint
                  </Button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
                  {callbot ? (
                    <>
                    <Button onClick={()=>setCallbot(false)}
                        className="absolute right-0 z-10 mr-12 mt-1">X</Button>
                     <div>
                      
                      <DemoBot questiondata={codeLines[currentIndex]} />
                      {console.log("hti sis a passed data object",codeLines[currentIndex])}  
                    </div>
                    </>
                   
                  ) : null}
      
    </div>
  );
};

export default CodeDisplay;

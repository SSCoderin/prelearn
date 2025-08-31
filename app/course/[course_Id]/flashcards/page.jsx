"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AiChatbot from "./_component/AiChatbot";

const FlashCardsWithTracking = () => {
  const params = useParams();
  const router = useRouter();
  const [flashData, setFlashData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gazeData, setGazeData] = useState([]);
  const [durationcount, setDurationCount] = useState(0);
  const [visiblity, setVisiblity] = useState(false);
  const [question, setQuestion] = useState("");

  const currentGazeRef = useRef({
    element: null,
    startTime: null,
    tagName: null,
    textContent: null,
    accumulatedDuration: 0,
    x: null,
    y: null,
  });
  const { user } = useUser();
  const pathSegments = params.course_Id.split("%2C");
  const course_Id = pathSegments[0];
  const studyType = decodeURIComponent(pathSegments[1]);
  const topic = decodeURIComponent(pathSegments[2]);
  const difficulty = decodeURIComponent(pathSegments[3]);

  const recordGazeDuration = (newElement, timestamp, x, y) => {
    const current = currentGazeRef.current;

    if (!current.element || !current.startTime) {
      currentGazeRef.current = {
        element: newElement,
        startTime: timestamp,
        tagName: newElement.tagName.toLowerCase(),
        textContent: newElement.textContent?.trim().slice(0, 50) || "",
        accumulatedDuration: 0,
        x,
        y,
      };
      return;
    }

    const newTagName = newElement?.tagName.toLowerCase();
    const newTextContent = newElement?.textContent?.trim().slice(0,50) || "";
    const duration = timestamp - current.startTime;

    if (duration > 100) {
      if (
        newElement &&
        (current.tagName !== newTagName ||
          current.textContent !== newTextContent)
      ) {
        if (current.tagName !== "html") {
          setGazeData((prevData) => [
            ...prevData,
            {
              tagName: current.tagName,
              textContent: current.textContent,
              duration: current.accumulatedDuration + duration,
              x: current.x,
              y: current.y,
            },
          ]);
        }
        setDurationCount(duration);

        currentGazeRef.current = {
          element: newElement,
          startTime: timestamp,
          tagName: newTagName,
          textContent: newTextContent,
          accumulatedDuration: 0,
          x,
          y,
        };
      } else {
        currentGazeRef.current = {
          ...current,
          accumulatedDuration: current.accumulatedDuration + duration,
          startTime: timestamp,
        };
      }
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      #webgazerVideoContainer, 
      #webgazerVideoFeed,
      #webgazerFaceOverlay,
      #webgazerFaceFeedbackBox {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    const webgazerScript = document.createElement("script");
    webgazerScript.src = "https://webgazer.cs.brown.edu/webgazer.js";
    webgazerScript.defer = true;
    document.head.appendChild(webgazerScript);

    webgazerScript.onload = () => {
      window.webgazer
        .showVideo(false)
        .showFaceOverlay(false)
        .showFaceFeedbackBox(false)
        .setGazeListener((data, timestamp) => {
          if (!data) return;

          const element = document.elementFromPoint(data.x, data.y);
          if (!element) return;

          recordGazeDuration(element, timestamp, data.x, data.y);
        })
        .begin();
    };

    return () => {
      if (currentGazeRef.current.element) {
        recordGazeDuration(null, Date.now(), null, null);
      }

      if (webgazerScript.parentNode) {
        document.head.removeChild(webgazerScript);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, []);

  const saveGazeData = async () => {
    try {
        if (!window.webgazer || !window.webgazer.getRegression) {
            console.error("Webgazer not initialized properly");
            return;
        }
        
        const modelData = {
            regression: window.webgazer.getRegression()
        };
        
        console.log("Saving gaze data:", modelData);
        
        // setIsLoading(true);
        
        const responsegazedata = await axios.post("/api/webgazertraindata", { 
            gazeData: modelData 
        });
        
        console.log("Gaze data saved successfully!", responsegazedata.data);
        
        // setIsLoading(false);
    } catch (error) {
        console.error("Error saving gaze data:", error);
        // setIsLoading(false);
    }
};

  useEffect(() => {
    getFlashData();
  }, []);

  useEffect(() => {
    if (durationcount > 1000) {
      setVisiblity(true);
      getGazequestion();
      setGazeData([]);
      saveGazeData();
    }
  }, [durationcount]);
  console.log("this is a gazadata",gazeData)

  const getFlashData = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`/api/flashcard`, {
        course_Id,
        studyType,
        topic,
        difficulty,
      });
      setFlashData(result.data.data);
    } catch (error) {
      console.error("Error fetching flash card data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGazequestion = async () => {
    console.log(user?.id);
    console.log(course_Id);
    console.log(studyType);
    console.log(topic);
    console.log(difficulty);
    console.log(gazeData);
    try {
      const Respgazequestion = await axios.post(`/api/gazequestion`, {
        user_Id: user?.id,
        course_Id,
        studyType,
        topic,
        difficulty,
        gazeData,
      });
      setQuestion(Respgazequestion.data.question);
    } catch (error) {
      console.error("Error fetching flash card data:", error);
    }
  };

  const downloadGazeData = () => {
    if (currentGazeRef.current.element) {
      recordGazeDuration(null, Date.now(), null, null);
    }

    const dataStr = JSON.stringify(gazeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "eye-tracking-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center mb-12">
        <div className="flex flex-row gap-6 items-center">
          <h1 className="text-4xl font-bold text-gray-800">Flashcards</h1>
          <div className="flex gap-4">
            <p className="text-lg font-medium text-white p-2 px-6 rounded-full bg-yellow-500 shadow-sm hover:shadow-md transition-shadow">
              {studyType}
            </p>
            <p className="text-lg font-medium text-white p-2 px-6 rounded-full bg-blue-500 shadow-sm hover:shadow-md transition-shadow">
              {topic}
            </p>
            <p className="text-lg font-medium text-white p-2 px-6 rounded-full bg-green-500 shadow-sm hover:shadow-md transition-shadow">
              {difficulty}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <DotLottieReact
            src="https://lottie.host/23be07fb-3cf1-496e-b398-a2b99d6db756/He4tmre427.lottie"
            loop
            autoplay
            style={{ width: "400px", height: "200px" }}
          />
          <p className="text-2xl font-bold text-blue-600">
            Generating FlashCards...
          </p>
        </div>
      ) : (
        <div>
          <Carousel className={visiblity ? "w-[70%]" : ""}>
            <CarouselContent>
              {flashData?.flashcard?.length > 0 ? (
                flashData.flashcard.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="p-4 border rounded-lg shadow-md mb-4"
                  >
                    <div className="mb-2">
                      <p className="text-lg font-semibold">{item.question}</p>
                    </div>
                    <div className="mb-2 bg-gray-100 p-2 rounded">
                      <pre className="whitespace-pre-wrap">
                        <code dangerouslySetInnerHTML={{ __html: item.code }} />
                      </pre>
                    </div>
                    <div className="bg-gray-100 p-2 rounded mt-4">
                      <pre className="whitespace-pre-wrap">
                        <p className="text-xl font-bold">Output:</p>
                        <code
                          dangerouslySetInnerHTML={{ __html: item.output }}
                        />
                      </pre>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <p className="px-6">No flashcards available</p>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="mt-8 space-x-4">
            <Button
              onClick={() =>router.replace(`/course/${params.course_Id}`)  }
            >
              Go back to course
            </Button>
          </div>
        </div>
      )}

      {visiblity ? (
        <div className="fixed bottom-4 right-4 z-50 transition-transform hover:border-blue-500 w-[500px]">
          <div className="flex justify-end mb-2"></div>
          <div className="flex justify-end">
            <Button
              className="bg-red-500 border-2 hover:border-red-500"
              onClick={() => {
                setVisiblity(false);
                setGazeData([]);
              }}
            >
              X
            </Button>
          </div>
          <AiChatbot gazeQuestion={question} />
        </div>
      ) : null}
    </div>
  );
};

export default FlashCardsWithTracking;





<div class="mb-2 bg-gray-100 p-2 rounded">
  <pre class="whitespace-pre-wrap">
    <code>
      <div class="bg-gray-100 p-3 rounded-lg">
        <pre>
          <code>sum = 0
for i in range(1, 6):  # i goes from 1 to 5
    if i % 2 == 0:     # if i is even
        sum += i * 2   # multiply by 2 and add to sum
    else:             # if i is odd
        sum += i      # add i to sum
print(sum)</code>
        </pre>
      </div>
    </code>
  </pre>
</div>
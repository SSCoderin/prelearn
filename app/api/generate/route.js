import { NextResponse } from "next/server";
import { Connect } from "@/configs/mogoconnect";
import Data from "@/models/dataModel";
// import Note from "@/models/noteModel";
import axios from "axios";
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate the study material for python for exam and level if difficulty will be Easy witht he summary of course list of chapter slong with the summary for each chapter Topic list in each chapter All \nin json format ",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Okay, let's craft some easy-level Python study material, designed for exam preparation...",
        },
      ],
    },
  ],
});

export async function POST(req) {
  try {
    await Connect();
    const { studyType, topic, difficulty, userID } = await req.json();

    const PROMPT = `Generate a comprehensive study material outline for:
        - Study Type: ${studyType}
        - Topic: ${topic}
        - Difficulty Level: ${difficulty}

        Please provide the response in JSON format with the following structure:
        {
            "courseSummary": "Brief overview of the entire course",
            "chapters": [
                {
                    "chapterTitle": "Chapter name",
                    "chapterSummary": "Brief description of chapter",
                    "topics": [
                        "Detailed topic 1",
                        "Detailed topic 2"
                    ]
                }
            ]
        }`;

    const result = await chatSession.sendMessage(PROMPT);
    const aiResult = JSON.parse(result.response.text());

    const newData = new Data({
      userId: userID,
      studyType: studyType,
      topic: topic,
      difficulty: difficulty,
      coursedata: aiResult,
    });

    await newData.save();

    console.log("Creating chapter notes...");
    for (const chapter of aiResult.chapters) {
      console.log(`Creating notes for chapter: ${chapter.chapterTitle}`);
      try {
        await axios.post("http://localhost:3000/api/note-html", {
          userId: userID,
          courseId: newData._id,
          chapters: chapter,
        });
      } catch (error) {
        console.error("Error creating chapter note:", error);
      }
    }

    return NextResponse.json(aiResult);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

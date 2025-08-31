import { NextResponse } from "next/server";
import gazeDataModel from "@/models/gazeDataModel";
import { Connect } from "@/configs/mogoconnect";

export async function POST(req) {
  try {
    await Connect();
    const { user_Id, course_Id, studyType, topic, difficulty, gazeData } =
      await req.json();
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
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
      responseMimeType: "application/json"
    };
    const prompt = `Analyze the following gaze tracking data and provide insights:
    ${JSON.stringify(gazeData)}
    
    Please provide a response in the following JSON format make sure to create a very detailed analysis including: viewing duration on each section, attention patterns, areas of focus and difficulty, reading speed variations, revisited content areas, engagement levels across different content types, and specific timestamps of notable behavior changes. and a one question to ask the user to help them understand the content better.
    {
      "summary": "Create a very detailed analysis including: viewing duration on each section, attention patterns, areas of focus and difficulty, reading speed variations, revisited content areas, engagement levels across different content types, and specific timestamps of notable behavior changes",
      "question": " Would you like me to explain [specific topic/concept] in a different way or provide additional examples to help you better understand it?"
    }`;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = JSON.parse(result.response.text());
    
    const gazeDataEntry = new gazeDataModel({
      user_Id,
      course_Id,
      studyType,
      topic,
      difficulty,
      summary: response.summary,
      question: response.question
    });
    
    await gazeDataEntry.save();
    
    return NextResponse.json({ 
      summary: response.summary,
      question: response.question
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
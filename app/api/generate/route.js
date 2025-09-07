import { NextResponse } from "next/server";
import { Connect } from "@/configs/mogoconnect";
import Data from "@/models/dataModel";
import Note from "@/models/noteModel";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    await Connect();
    const { studyType, topic, difficulty, userID } = await req.json();

    console.log("Part 1: Generating JSON course outline...");
    const jsonModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const jsonPrompt = `Generate a comprehensive study material outline for:
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

    const jsonResult = await jsonModel.generateContent(jsonPrompt);
    const courseData = JSON.parse(jsonResult.response.text());

    console.log("Part 2: Saving the course outline to the database...");
    const newCourse = new Data({
      userId: userID,
      studyType: studyType,
      topic: topic,
      difficulty: difficulty,
      coursedata: courseData,
    });
    await newCourse.save();
    console.log("Course outline saved with ID:", newCourse._id);

    console.log("Part 3: Generating HTML notes for each chapter...");
    const htmlModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });

    const notePromises = courseData.chapters.map(async (chapter) => {
      console.log(`- Generating HTML for chapter: ${chapter.chapterTitle}`);

      const htmlPrompt = `Create a comprehensive and visually appealing educational content using Tailwind CSS classes for the following chapter and topics. Do not include HTML head or body tags, only the inner content.

        Chapter: ${chapter.chapterTitle}
        Summary: ${chapter.chapterSummary}
        Topics: ${chapter.topics.join(", ")}

        Please provide:
        1. A beautifully styled chapter title using modern typography classes
        2. An engaging chapter summary with proper spacing and formatting
        3. For each topic:
          - Detailed explanations with real-world examples
          - Key concepts highlighted in styled boxes
          - Important points in bulleted lists
          - Code examples where applicable
          - Proper spacing and responsive design
        
        Use a clean, modern design with Tailwind CSS classes.`;

      const htmlResult = await htmlModel.generateContent(htmlPrompt);
      const htmlContent = htmlResult.response.text();

      const newNote = new Note({
        Id: userID,
        course_Id: newCourse._id,
        chapterTitle: chapter.chapterTitle,
        notehtml: htmlContent,
      });
      await newNote.save();
      console.log(`- Saved note for chapter: ${chapter.chapterTitle}`);
    });

    await Promise.all(notePromises);

    console.log("All notes have been successfully generated and saved.");

    return NextResponse.json(courseData);
  } catch (error) {
    console.error("Error in generate-course API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate course" },
      { status: 500 }
    );
  }
}

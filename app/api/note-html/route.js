import { NextResponse } from "next/server";
import { Connect } from "@/configs/mogoconnect";
import Note from "@/models/noteModel";

export async function POST(req) {
  try {
    const { userId, courseId, chapters } = await req.json();
    const {
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
    } = require("@google/generative-ai");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 8192,
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Create a comprehensive and visually appealing educational content using Tailwind CSS classes for the following chapter and topics. Do not include HTML head or body tags, only the inner content.

Chapter: ${chapters.chapterTitle}
Summary: ${chapters.chapterSummary}
Topics: ${chapters.topics.join(", ")}

Please provide:
1. A beautifully styled chapter title using modern typography classes
2. An engaging chapter summary with proper spacing and formatting
3. For each topic:
   - Detailed explanations with real-world examples
   - Key concepts highlighted in styled boxes
   - Important points in bulleted lists
   - Code examples where applicable
   - Visual hierarchy using different text sizes and weights
   - Proper spacing between sections
   - Interactive elements with hover effects
   - Responsive design considerations

Use Tailwind CSS classes to create:
- Elegant color schemes
- Card-based layouts
- Shadow effects
- Rounded corners
- Responsive padding and margins
- Hover and focus states
- Grid/Flex layouts for content organization
- Styled lists and blockquotes
- Emphasis on important information`,
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(JSON.stringify(chapters));
    const htmlContent = result.response.text();

    await Connect();
    const newNote = new Note({
        Id: userId,
      course_Id: courseId,
      chapterTitle: chapters.chapterTitle,
      notehtml: htmlContent,
    });
    await newNote.save();

    return NextResponse.json({ message: "Note saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save note" },
      { status: 500 }
    );
  }
}
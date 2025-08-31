import { NextResponse } from "next/server";
import { Connect } from "@/configs/mogoconnect";
import FlashCard from "@/models/FlashCardModel";

const { GoogleGenerativeAI } = require("@google/generative-ai");

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
  responseMimeType: "text/plain",
};

export async function POST(req) {
  try {
    console.log("API request received.");
    const { course_Id, studyType, topic, difficulty } = await req.json();
    await Connect();

    const existingData = await FlashCard.findOne({ course_Id: course_Id });
    if (existingData) {
      console.log("Data found in the database.");
      console.log("Data: found in the database", existingData);
      return NextResponse.json({ success: true, data: existingData });
    }

    async function generateFlashCards() {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: `Generate a JSON array containing 10 objects for the ${studyType} programming language with ${difficulty} difficulty level about ${topic}. Each object should include:

- "question": A well-structured ${studyType}-related question.
- "code": ${studyType} code formatted using proper HTML structure with <div>, <pre>, and <code> for readability.
- "output": The expected output of the code in the same HTML structure.

Example structure:

[
  {
    "question": "What will be the output of the following ${studyType} code?",
    "code": "<div class='bg-gray-100 p-3 rounded-lg'><pre><code>num = 10<br>print(num * 2)</code></pre></div>",
    "output": "<div class='bg-green-100 p-3 rounded-lg'><pre><code>20</code></pre></div>"
  }
]

Ensure:
- Each question contains more than 5 lines of code.
- Use <br> instead of \n for new lines.
- Do not use escape characters (/, \n).
- Use Tailwind CSS for styling.

Generate exactly 10 such flashcards in JSON format, and ensure the response is **raw JSON only**, with no markdown or explanation.`
              }
            ],
          }
        ],
      });

      const result = await chatSession.sendMessage("Generate Flashcards");
      return result.response.text();
    }

    let response = await generateFlashCards();
    
    // Clean AI response (remove Markdown formatting)
    response = response.replace(/```json/g, "").replace(/```/g, "").trim();

    // Validate if the response is a valid JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError);
      return NextResponse.json({ success: false, error: "Invalid JSON response from AI" });
    }

    // Save to MongoDB
    const flashcard = new FlashCard({
      course_Id: course_Id,
      flashcard: parsedResponse,
    });

    await flashcard.save();

    return NextResponse.json({ success: true, data: flashcard });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}




export async function GET (req){
  await Connect();
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const course_Id = searchParams.get("course_Id") || req.url.split("/").pop();
  console.log("this is get the id from the url ", course_Id);
  const data  = await FlashCard.find({course_Id: course_Id})  
  return NextResponse.json({data: data})

}



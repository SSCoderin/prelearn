import { NextResponse } from "next/server";
import { Connect } from "@/configs/mogoconnect";
import Data from "@/models/dataModel";
import Note from "@/models/noteModel";
export async function POST(req) {
  const { userID } = await req.json();
  await Connect();
  const data = await Data.find({ userId: userID });
  return NextResponse.json({ data: data });
}

// URL: /api/courses?course_Id=your_course_id_here

export async function GET(req) {
  await Connect();
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const course_Id = searchParams.get("course_Id") || req.url.split("/").pop();
  console.log("this is get the id from the url ", course_Id);
  const data = await Note.find({ course_Id: course_Id });
  return NextResponse.json({ data: data });
}
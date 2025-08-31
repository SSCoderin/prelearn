import { NextResponse } from "next/server";
import webgazerDataModel from "@/models/webgazerDataModel";
import { Connect } from "@/configs/mogoconnect";

export async function POST(req) {
    try {
        await Connect();
        
        const { gazeData } = await req.json();
        
        if (!gazeData || !gazeData.regression) {
            return NextResponse.json({ 
                success: false, 
                status: "error", 
                error: "Invalid gazeData format" 
            }, { status: 400 });
        }
        
        const newData = await webgazerDataModel.create({ 
            data: gazeData 
        });
        
        return NextResponse.json({ 
            success: true, 
            data: newData 
        });    
    } catch (error) {
        console.error("Error saving gaze data:", error);
        return NextResponse.json({ 
            success: false, 
            status: "error", 
            error: error.message 
        }, { status: 500 });
    }
}
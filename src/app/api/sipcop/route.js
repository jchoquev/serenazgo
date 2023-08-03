import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function POST(request){
    const data= await request.json();
    await connectDB();
    const sipcop= await (new SipCop(data)).save();
    return NextResponse.json({ok:true,msg:sipcop});
}
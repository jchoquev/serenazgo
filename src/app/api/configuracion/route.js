import { NextResponse } from "next/server";
import { Config } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(req,res){
    try {
        await connectDB();
        const resp= await Config.findOne({});
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
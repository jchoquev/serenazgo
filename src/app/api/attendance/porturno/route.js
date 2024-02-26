import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function GET(request,{ params }){
    try {
        const Grupo={
            "Grupo._id":"64d2cc69dbab8e556e1cdc46"
        }
        await connectDB();
        const data = await Staff.find();
        return NextResponse.json({ok:true,msg:data});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
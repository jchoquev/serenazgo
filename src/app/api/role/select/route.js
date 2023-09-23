import { NextResponse } from "next/server";
import { Role } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    try {
        await connectDB();
        const role = await Role.find({FHeliminar:null}).sort({ Value: 1});
        return NextResponse.json({ok:true,msg:role});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
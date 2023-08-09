import { NextResponse } from "next/server";
import { Handy } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(request,{ params }){
    try {
        await connectDB();
        const page=params.index;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const resp = await Handy.find({ FHeliminar: null }).sort({ Numero: 1 }).skip(skip).limit(perPage);
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
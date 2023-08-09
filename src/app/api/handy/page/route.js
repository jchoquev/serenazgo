import { NextResponse } from "next/server";
import { Handy } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const perPage = 10;
        const totalItems = await Handy.countDocuments({ FHeliminar: null });
        const totalPages = Math.ceil(totalItems / perPage);
        return NextResponse.json({ok:true,msg:totalPages});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
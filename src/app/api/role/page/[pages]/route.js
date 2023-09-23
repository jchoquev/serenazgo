import { NextResponse } from "next/server";
import { Role } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function GET(request,{ params }){
    try {
        await connectDB();
        const {pages}=params;
        const perPage=10
        const skip = (pages - 1) * perPage;
        const searchTerm={ FHeliminar: null }
        const data = await Role.find(searchTerm).sort({ FHactualizacion: -1 }).skip(skip).limit(perPage);
        const totalItems = await Role.countDocuments(searchTerm);
        const totalPages = Math.ceil(totalItems / perPage);
        return NextResponse.json({ok:true,msg:data,totalPages});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const filtro = {NDocumento: searchParams.get("NDocumento")};
        await connectDB();
        const resp= await Staff.findOne(filtro).select("_id fullNombres NCelular");
        if(!resp) return  NextResponse.json({ok:false,msg:"Ocurrio un error ..."},{status:400});
        return NextResponse.json({ok:Boolean(resp),msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
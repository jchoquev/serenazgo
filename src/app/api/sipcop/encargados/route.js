import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { Responsable } from "@/models/sipcop";
export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const filtro =  {FHeliminar:null,_id:{$in:Array.from(searchParams.values("Responsables[]"))}};
        await connectDB();
        const resp= await Responsable.find(filtro);
        return NextResponse.json({ok:Boolean(resp),msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
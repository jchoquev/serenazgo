import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        
        const filtro = {
            IdTurno: searchParams.get("idTurno"),
            FHregistro: {
              $gte: searchParams.get("Fechai"),
              $lte: searchParams.get("Fechaf"),
            },
            FHeliminar: null,
        };
        await connectDB();
        const resp= await SipCop.find(filtro).sort({ Numero: 1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
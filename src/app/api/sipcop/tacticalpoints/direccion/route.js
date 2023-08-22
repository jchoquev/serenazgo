import { NextResponse } from "next/server";
import { PuntosTactico } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";
import { encontrarPuntoMasCercano } from "@/functions/sipcop/tactico";
export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const miUbicacion = {Latitud:searchParams.get("Latitud"),Longitud:searchParams.get("Longitud")};
        await connectDB();
        const ptactico= await PuntosTactico.find({Activo:true,FHeliminar:null});
        const punto=await encontrarPuntoMasCercano(ptactico,miUbicacion)
        return NextResponse.json({ok:true,msg:punto});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
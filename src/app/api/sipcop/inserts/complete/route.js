import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function POST(request){
    try {
        const {add,turno}=await request.json();
        await connectDB();
        const insert=await SipCop.insertMany(add.map(item => ({IdVehiculo:item._id,Numero:item.Numero,IdPlaca:item.Placa,TipoVehiculo:item.Tipo.Tipo,IdTurno:turno._id.toString(),Turno:turno.Turno})));
        return NextResponse.json({ok:true,msg:insert});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
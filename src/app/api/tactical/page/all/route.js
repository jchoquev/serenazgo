import { NextResponse } from "next/server";
import { PuntosTactico } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const searchTerm={FHeliminar: null,Activo: true}
        const resp = await PuntosTactico.find(searchTerm)
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

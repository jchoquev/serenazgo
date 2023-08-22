import { NextResponse } from "next/server";
import { PuntosTactico } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const resp= await PuntosTactico.find({FHeliminar:null,Activo:true}).sort({ Numero: 1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const Group= await request.json();
        await connectDB();
        const TacticalFound = await PuntosTactico.findOne({_id:Group._id});
        if(!TacticalFound) return NextResponse.json({ok:false,msg:"El grupo no existe..."},{status:400});
        const tactical= await PuntosTactico.findOneAndUpdate({_id:Group._id},{Activo:Group.Activo},{ new: true });
        return NextResponse.json({ok:true,msg:tactical});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
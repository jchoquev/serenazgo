import { NextResponse } from "next/server";
import { PuntosTactico } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function POST(request){
    try {
        const Group=await request.json();
        const send={
            Direccion:Group.Direccion.toUpperCase(),
            Latitud:Group.Latitud,
            Longitud:Group.Longitud,
            Activo:Group.Activo
        }
        await connectDB();
        const tactical= await (new PuntosTactico(send)).save();
        return NextResponse.json({ok:true,msg:tactical});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const Group= await request.json();
        const update={
            Direccion:Group.Direccion.toUpperCase(),
            Latitud:Group.Latitud,
            Longitud:Group.Longitud,
            Activo:Group.Activo
        }
        await connectDB();
        const TacticalFound = await PuntosTactico.findOne({_id:Group._id});
        if(!TacticalFound) return NextResponse.json({ok:false,msg:"El punto tactico no existe..."},{status:400});
        const tactical= await PuntosTactico.findOneAndUpdate({_id:Group._id},update,{ new: true });
        return NextResponse.json({ok:true,msg:tactical});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const tacticalFound = await PuntosTactico.findOne({_id});
        if(!tacticalFound) return NextResponse.json({ok:false,msg:"El punto tactico no existe..."},{status:400});
        const tactical= await PuntosTactico.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:tactical});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

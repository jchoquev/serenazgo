import { NextResponse } from "next/server";
import { typesVehicle } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    try {
        await connectDB();
        const veh = await typesVehicle.find({FHeliminar:null}).sort({ FHregistro: -1,Prioridad: 1});
        return NextResponse.json({ok:true,msg:veh});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const {Tipo,Prioridad}= await request.json();
        await connectDB();
        const vehiculo= await (new typesVehicle({Tipo:Tipo.toUpperCase(),Prioridad})).save();
        return NextResponse.json({ok:true,msg:vehiculo});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const {_id,Tipo,Prioridad}= await request.json();
        await connectDB();
        const typeFound = await typesVehicle.findOne({_id});
        if(!typeFound) return NextResponse.json({ok:false,msg:"El tipo de vehiculo no existe..."},{status:400});
        const type= await typesVehicle.findOneAndUpdate({_id },{Tipo:Tipo.toUpperCase(),Prioridad},{ new: true });
        return NextResponse.json({ok:true,msg:type});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const typeFound = await typesVehicle.findOne({ _id});
        if(!typeFound) return NextResponse.json({ok:false,msg:"El tipo de vehiculo no existe..."},{status:400});
        const type= await typesVehicle.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:type});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

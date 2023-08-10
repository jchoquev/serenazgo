import { NextResponse } from "next/server";
import { Vehiculo } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    try {
        await connectDB();
        const veh = await Vehiculo.find({FHeliminar:null}).sort({ 'Tipo.Prioridad':-1,Activo: -1,Numero: 1});
        return NextResponse.json({ok:true,msg:veh});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const Group=await request.json();
        const send={
            Numero:Group.Numero,
            Placa:Group.Placa.toUpperCase(),
            Activo:Group.Activo,
            Tipo:Group.Tipo
        }
        await connectDB();
        const group= await (new Vehiculo(send)).save();
        return NextResponse.json({ok:true,msg:group});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const Group= await request.json();
        const update={
            Numero:Group.Numero,
            Placa:Group.Placa.toUpperCase(),
            Activo:Group.Activo,
            Tipo:Group.Tipo
        }
        await connectDB();
        const VehicleFound = await Vehiculo.findOne({_id:Group._id});
        if(!VehicleFound) return NextResponse.json({ok:false,msg:"El vehiculo no existe..."},{status:400});
        const veh= await Vehiculo.findOneAndUpdate({_id:Group._id},update,{ new: true });
        return NextResponse.json({ok:true,msg:veh});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const VehicleFound = await Vehiculo.findOne({_id});
        if(!VehicleFound) return NextResponse.json({ok:false,msg:"El vehiculo no existe..."},{status:400});
        const veh= await Vehiculo.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:veh});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}


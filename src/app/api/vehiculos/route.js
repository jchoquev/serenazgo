import { NextResponse } from "next/server";
import { Vehiculo } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    const vehiculos = await Vehiculo.find().sort({ Activo: -1,Numero: 1});
    if(vehiculos){
        return NextResponse.json({ok:true,msg:vehiculos});
    }else{
        return NextResponse.json({ok:false,msg:"No existe vehiculos..."},{status:400});
    }
}

export async function POST(request){
    const {Placa,Numero,Activo}= await request.json();
    await connectDB();
    const vehiculo= await (new Vehiculo({Placa,Numero,Activo})).save();
    return NextResponse.json({ok:true,msg:vehiculo});
}

export async function PUT(request){
    const {_id,Numero,Activo}= await request.json();
    await connectDB();
    const vehiculoFound = await Vehiculo.findOne({_id});
    if(!vehiculoFound) return NextResponse.json({ok:false,msg:"El vehiculo no existe..."},{status:400});
    const vehiculo= await Vehiculo.findOneAndUpdate({_id },{Numero,Activo},{ new: true });
    return NextResponse.json({ok:true,msg:vehiculo});
}

export async function DELETE(request){
    const {_id}= await request.json();
    await connectDB();
    const vehiculoFound = await Vehiculo.findOneAndDelete({ _id: _id });
    if(vehiculoFound){
        return NextResponse.json({ok:true,msg:vehiculoFound});
    }else{
        return NextResponse.json({ok:false,msg:"Intentelo mas tarde..."},{status:400});
    }
}

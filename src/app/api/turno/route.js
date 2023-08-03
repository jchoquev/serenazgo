import { NextResponse } from "next/server";
import { Turno } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    return NextResponse.json({"holas":"pe"});
}

export async function POST(request){
    try {
        const {Value,Anterior,dAnterior,Grupos}=await request.json();
        await connectDB();
        const turno= await (new Turno({Value,Anterior,dAnterior,Grupos})).save();
        return NextResponse.json({ok:true,msg:turno});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const {_id,Value,Anterior,dAnterior,Grupos}= await request.json();
        await connectDB();
        const vehiculoFound = await Turno.findOne({_id});
        if(!vehiculoFound) return NextResponse.json({ok:false,msg:"El turno no existe..."},{status:400});
        const turno= await Turno.findOneAndUpdate({_id },{Value,Anterior,dAnterior,Grupos},{ new: true });
        return NextResponse.json({ok:true,msg:turno});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
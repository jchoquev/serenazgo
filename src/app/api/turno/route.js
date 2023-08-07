import { NextResponse } from "next/server";
import { Turno } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const resp= await Turno.find({FHeliminar:null}).sort({ Turno: 1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const req=await request.json();
        await connectDB();
        const turno= await (new Turno({Turno:req.Turno,HEntrada:req.HEntrada,HSalida:req.HSalida})).save();
        return NextResponse.json({ok:true,msg:turno});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const req= await request.json();
        await connectDB();
        const TurnoFound = await Turno.findOne({_id:req._id});
        if(!TurnoFound) return NextResponse.json({ok:false,msg:"El turno no existe..."},{status:400});
        const turno= await Turno.findOneAndUpdate({_id:req._id},{Turno:req.Turno,HEntrada:req.HEntrada,HSalida:req.HSalida},{ new: true });
        return NextResponse.json({ok:true,msg:turno});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const req= await request.json();
        await connectDB();
        const TurnoFound = await Turno.findOne({_id:req._id});
        if(!TurnoFound) return NextResponse.json({ok:false,msg:"El turno no existe..."},{status:400});
        const turno= await Turno.findOneAndUpdate({_id:req._id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:turno});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}


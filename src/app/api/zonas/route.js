import { NextResponse } from "next/server";
import { Zones } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const resp= await Zones.find({FHeliminar:null}).sort({ FHregistro: -1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const {Zona}=await request.json();
        await connectDB();
        const zones= await (new Zones({Zona:Zona.toUpperCase()})).save();
        return NextResponse.json({ok:true,msg:zones});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const {_id,Zona}= await request.json();
        await connectDB();
        const ZoneFound = await Zones.findOne({_id});
        if(!ZoneFound) return NextResponse.json({ok:false,msg:"La zona no existe..."},{status:400});
        const zone= await Zones.findOneAndUpdate({_id},{Zona:Zona.toUpperCase()},{ new: true });
        return NextResponse.json({ok:true,msg:zone});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const ZoneFound = await Zones.findOne({_id});
        if(!ZoneFound) return NextResponse.json({ok:false,msg:"La zona no existe..."},{status:400});
        const zone= await Zones.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:zone});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}


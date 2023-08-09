import { NextResponse } from "next/server";
import { Handy } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const resp= await Handy.find({FHeliminar:null}).sort({ FHregistro: -1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const Group=await request.json();
        const send={
            Numero:Group.Numero,
            Activo:Group.Activo,
            Observacion:Group.Observacion
        }
        await connectDB();
        const group= await (new Handy(send)).save();
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
            Activo:Group.Activo,
            Observacion:Group.Observacion
        }
        await connectDB();
        const HandyFound = await Handy.findOne({_id:Group._id});
        if(!HandyFound) return NextResponse.json({ok:false,msg:"El grupo no existe..."},{status:400});
        const handy= await Handy.findOneAndUpdate({_id:Group._id},update,{ new: true });
        return NextResponse.json({ok:true,msg:handy});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const HandyFound = await Handy.findOne({_id});
        if(!HandyFound) return NextResponse.json({ok:false,msg:"El grupo no existe..."},{status:400});
        const handy= await Handy.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:handy});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}


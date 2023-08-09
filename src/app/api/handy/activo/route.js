import { NextResponse } from "next/server";
import { Handy } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const resp= await Handy.find({FHeliminar:null,Activo:true}).sort({ Numero: 1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const Group= await request.json();
        await connectDB();
        const HandyFound = await Handy.findOne({_id:Group._id});
        if(!HandyFound) return NextResponse.json({ok:false,msg:"El grupo no existe..."},{status:400});
        const handy= await Handy.findOneAndUpdate({_id:Group._id},{Activo:Group.Activo},{ new: true });
        return NextResponse.json({ok:true,msg:handy});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
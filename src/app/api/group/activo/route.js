import { NextResponse } from "next/server";
import { Grupo } from "@/models/default";
import { connectDB } from "@/libs/mongodb";

export async function GET(){
    try {
        await connectDB();
        const resp= await Grupo.find({FHeliminar:null,Activo:true}).sort({ FHregistro: -1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const Group= await request.json();
        await connectDB();
        const GroupFound = await Grupo.findOne({_id:Group._id});
        if(!GroupFound) return NextResponse.json({ok:false,msg:"El grupo no existe..."},{status:400});
        const group= await Grupo.findOneAndUpdate({_id:Group._id},{Activo:Group.Activo},{ new: true });
        return NextResponse.json({ok:true,msg:group});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
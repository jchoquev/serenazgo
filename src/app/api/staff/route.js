import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function GET(request){
    try {
        await connectDB();
        const pos = await Staff.find({FHeliminar:null}).sort({ FHregistro: -1});
        return NextResponse.json({ok:true,msg:pos});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const user=await request.json();
        const send={
            NDocumento:user.NDocumento,
            Password:await bcrypt.hash(user.NDocumento,12),
            Nombres:user.Nombres.toUpperCase(),
            ApePaterno:user.ApePaterno.toUpperCase(),
            ApeMaterno:user.ApeMaterno.toUpperCase(),
            NCelular:user.NCelular,
            Cargo:user.Cargo,
            Grupo:user.Grupo,
            Activo:user.Activo,
            uPassword:uuidv4(),
        }
        await connectDB();
        await (new Staff(send)).save();
        return NextResponse.json({ok:true,msg:"Insertado Correctamente..."});
    } catch (error) {
        console.error(error)
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const UserFound = await Staff.findOne({_id});
        if(!UserFound) return NextResponse.json({ok:false,msg:"La zona no existe..."},{status:400});
        await Staff.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
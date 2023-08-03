import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

export async function POST(request){
    const {Usuario,Clave}= await request.json();
    await connectDB();
    if(!Clave||Clave.length<6){
        return NextResponse.json({ok:false,msg:"La clave tiene que tener 6 caracteres"},{status:400});
    }
    try{
        const userFound = await User.findOne({User:Usuario});
        if(userFound) return NextResponse.json({ok:false,msg:"El usuario ya existe..."},{status:400});
        const hashPassword= await bcrypt.hash(Clave,12);
        const user= await (new User({User:Usuario,Password:hashPassword})).save();
        console.log(user);
        return NextResponse.json({ok:true,msg:user});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error: Revise los campos o intentelo mas tarde..."},{status:400});
    }
   
}
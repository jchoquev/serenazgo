import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs"

export async function PUT(request){
    try {
        const {Password,oldPassword,token}=await request.json();
        const update={
            Password:await bcrypt.hash(Password,12),
            uPassword:null
        }
        await connectDB();
        const UserFound = await Staff.findOne({uPassword:token,Activo:true}).select('+Password');
        if(!UserFound&&UserFound.Activo===false) throw new Error("Ocurrio un error...");
        const passwordMatch= await bcrypt.compare(oldPassword,UserFound.Password);
        if(!passwordMatch) throw new Error("Ocurrio un error...");
        await Staff.findOneAndUpdate({uPassword:token,Password:UserFound.Password,Activo:true},update,{ new: true });
        return NextResponse.json({ok:true,msg:"Cambios correctos..."});
    } catch (error) {
        console.error(error)
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
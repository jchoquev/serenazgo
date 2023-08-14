import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function PUT(request){
    try {
        const Group= await request.json();
        await connectDB();
        const UserFound = await Staff.findOne({_id:Group._id});
        if(!UserFound) return NextResponse.json({ok:false,msg:"El usuario no existe..."},{status:400});
        await Staff.findOneAndUpdate({_id:Group._id},{Activo:Group.Activo},{ new: true });
        return NextResponse.json({ok:true});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
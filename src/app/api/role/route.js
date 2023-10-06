import { NextResponse } from "next/server";
import { Role } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function POST(request){
    try {
        const {_id,Value,Access,update}=await request.json();
        await connectDB();
        if(!update){
            const send={Value:Value.toUpperCase()}
            const resp=await (new Role(send)).save();
            return NextResponse.json({ok:true,msg:resp});
        }else{
            const RoleFound = await Role.findById(_id);
            if(!RoleFound) return NextResponse.json({ok:false,msg:"El rol no existe..."},{status:400});
            const msg= await Role.findOneAndUpdate({_id},{Value:Value.toUpperCase(),Access},{ new: true });
            return NextResponse.json({ok:true,msg});
        }
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const RoleFound = await Role.findById(_id);
        if(!RoleFound) return NextResponse.json({ok:false,msg:"El rol no existe..."},{status:400});
        const rol= await Role.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:rol});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}


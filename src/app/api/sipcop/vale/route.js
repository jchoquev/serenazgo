import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function POST(request){
    try {
        const {_idSipCop,update,...data}=await request.json();
        console.log(_idSipCop,update,data)
        await connectDB();
        const SipcopFound=await SipCop.findById(_idSipCop)
        if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        const resp= await SipCop.findOneAndUpdate({_id:_idSipCop},{Vale:{...data,FHregistro:new Date()}},{ new: true });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
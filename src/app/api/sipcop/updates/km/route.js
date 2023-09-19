import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function PUT(request){
    try {
        const {_id,Inicial,Final,Verificado,Nombres}= await request.json();
        await connectDB();
        const SipcopFound=await SipCop.findById(_id)
        if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        const sipcop= await SipCop.findOneAndUpdate({_id},{Kilometraje:{Inicial,Final,Verificado,Nombres}},{ new: true });
        return NextResponse.json({ok:true,msg:sipcop});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
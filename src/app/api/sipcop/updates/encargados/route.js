import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function POST(request){
    //try {
        const {_id,Nombres,Cargo,DNI,NCelular,Conductor}= await request.json();
        await connectDB();
        const SipcopFound=await SipCop.findById(_id)
        if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        const update={Nombres,Cargo,DNI,NCelular,Conductor}
        SipcopFound.Responsables.push(update);
        const sipcop= await SipCop.findOneAndUpdate({_id},{Responsables:SipcopFound.Responsables},{ new: true });
        return NextResponse.json({ok:true,msg:sipcop});
    /*} catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }*/
}
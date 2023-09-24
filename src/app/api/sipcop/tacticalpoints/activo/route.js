import { NextResponse } from "next/server";
import { Tactico } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function PUT(request){
    try {
        const {_id,Completo}= await request.json();
        await connectDB();
        const TacticoFound = await Tactico.findById(_id);
        if(!TacticoFound) return NextResponse.json({ok:false,msg:"El elemento no existe en el SIPCOP..."},{status:400});
        const fTactico= await Tactico.findOneAndUpdate({_id},{Completo},{ new: true });
        return NextResponse.json({ok:true,msg:fTactico});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
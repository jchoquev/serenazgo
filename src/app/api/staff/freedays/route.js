import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function PUT(request){
    try {
        const {_id,LibreDesde,LibreHasta}= await request.json();
        await connectDB();
        const ZoneFound = await Staff.findOne({_id});
        if(!ZoneFound) return NextResponse.json({ok:false,msg:"El usuario no existe..."},{status:400});
        const zone= await Staff.findOneAndUpdate({_id},{LibreDesde,LibreHasta},{ new: true });
        return NextResponse.json({ok:true,msg:zone});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
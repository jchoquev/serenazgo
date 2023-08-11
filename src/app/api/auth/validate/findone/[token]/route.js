import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function GET(request,{params:{token}}){
    try {
        await connectDB();
        const resp= await Staff.findOne({uPassword:token,Activo:true});
        return NextResponse.json({ok:!resp?false:true});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";
import moment from "moment/moment";

export async function GET(request){
    //try {
        const { searchParams } = new URL(request.url);
        const fechai = moment.utc(searchParams.get("fecha"),"DD/MM/YYYY")
        const fechaf= moment.utc(searchParams.get("fecha"),"DD/MM/YYYY").add(1,"day");
        const turno = searchParams.get("turno");
        const filtro = {
            Turno: turno,
            FHregistro: {
              $gte: fechai.toDate(),
              $lte: fechaf.toDate(),
            },
            FHeliminar: null,
        };
        await connectDB();
        const resp= await SipCop.find(filtro);
        return NextResponse.json({ok:true,msg:resp});
    /*} catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }*/
}
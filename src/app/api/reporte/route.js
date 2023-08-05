import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { Config } from "@/models/default";
import { connectDB } from "@/libs/mongodb";
import moment from "moment/moment";

export async function GET(request){
    try {
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
        let resp= await SipCop.find(filtro).sort({ Numero: 1 }).select('Activo Numero IdPlaca Kilometraje Tiempo Incidencias');
        const config=await Config.findOne();
        resp=resp.map((ele) => {
            let Kilometraje=(config.SIPkm-ele.Kilometraje)
            let Tiempo=(config.SIPminutos-ele.Tiempo)
            if(Kilometraje<=0) Kilometraje="CUMPLIO";
            if(Tiempo<=0) Tiempo="CUMPLIO";
            return {Activo:ele.Activo,Numero:ele.Numero,IdPlaca:ele.IdPlaca,Incidencias:ele.Incidencias,Kilometraje,Tiempo};
        });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { Config } from "@/models/default";
import { Tactico } from "@/models/sipcop";
import { Incidencia } from "@/models/sipcop";
import { Responsable } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";
import moment from "moment/moment";

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const fecha=searchParams.get("fecha")
        const fechai = moment(fecha,"DD-MM-YYYY",true).startOf("day").utc()
        const fechaf= moment(fecha,"DD-MM-YYYY",true).endOf("day").utc()
        const filtro = {
            FHregistro: {
              $gte: fechai.toDate(),
              $lte: fechaf.toDate(),
            },
            FHeliminar: null,
        };
        await connectDB();
        const resp= await SipCop.find(filtro).sort({ Numero: 1 });
        const config=await Config.findOne();
        let Tacticop=[]
        let Incidenciap=[]
        let Responsablep=[]
        resp.map((ele) => {
            const {Tactico,Incidencia,Responsables}=ele
            Tacticop=[...Tacticop,...Tactico]
            Incidenciap=[...Incidenciap,...Incidencia]
            Responsablep=[...Responsablep,...Responsables]
        });
        Tacticop=await Tactico.find({_id: { $in: Tacticop },})
        Incidenciap=await Incidencia.find({_id: { $in: Incidenciap },})
        Responsablep=await Responsable.find({_id: { $in: Responsablep },})
        return NextResponse.json({ok:true,
            msg:{
                Registro:resp,
                Config:config,
                Tactico:Tacticop,
                Incidencia:Incidenciap,
                Responsables:Responsablep
            }
        });
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
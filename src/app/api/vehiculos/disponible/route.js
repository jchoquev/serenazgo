import { NextResponse } from "next/server";
import { Vehiculo } from "@/models/default";
import { connectDB } from "@/libs/mongodb";
import { SipCop } from "@/models/sipcop";

export async function GET(request){
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        let filtro = {
            IdTurno: searchParams.get("_idTurno"),
            FHregistro: {
              $gte: searchParams.get("from"),
              $lte: searchParams.get("until"),
            },
            FHeliminar: null,
        };
        const sipcop= await SipCop.find(filtro);
        filtro ={_id: { $nin: sipcop.map((item)=>item.IdVehiculo) },FHeliminar:null,Activo:true}
        console.log(filtro)
        const resp= await Vehiculo.find(filtro).sort({ 'Tipo.Prioridad':1,Numero:1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
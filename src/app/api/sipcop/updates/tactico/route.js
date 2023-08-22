import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";
import { ConfigSipcop } from "@/models/default";
import { ObjectId } from "mongodb";
import moment from "moment";

export async function POST(request){
    try {
        const {_id,Direccion,HLlegada,Observaciones,Posicion,Revisar}= await request.json();
        await connectDB();
        const config=await ConfigSipcop.findOne({});
        const HSeira = moment(HLlegada, "HH:mm:ss").add(config.TACminutos, 'minutes').format("HH:mm:ss");
        const update={Direccion,Posicion,HLlegada,HSeira,Observaciones:Observaciones||"",Posicion,Revisar}
        const SipcopFound=await SipCop.findById(_id)
        if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        SipcopFound.Tactico.push(update);
        const sipcop= await SipCop.findOneAndUpdate({_id},{Tactico:SipcopFound.Tactico},{ new: true });
        return NextResponse.json({ok:true,msg:sipcop});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const {idTactico,_id,Direccion,HLlegada,HSeira,Observaciones,Posicion,Revisar,Completo}= await request.json();
        await connectDB();
        const SipcopFound=await SipCop.findById(idTactico)
        if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        const update=SipcopFound.Tactico.map((item)=>{
            if (String(item._id) === String(_id)) {
                const updatedItem = JSON.parse(JSON.stringify(item));
                updatedItem.Direccion = Direccion;
                updatedItem.Posicion = Posicion;
                updatedItem.HLlegada = HLlegada;
                updatedItem.HSeira = HSeira;
                updatedItem.Observaciones = Observaciones || "";
                updatedItem.Posicion = Posicion;
                updatedItem.Revisar = Revisar;
                updatedItem.Completo = Completo;
                return updatedItem;
            }
            return item;
        })
        const sipcop= await SipCop.findOneAndUpdate({_id:idTactico},{Tactico:update},{ new: true });
        return NextResponse.json({ok:true,msg:sipcop});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
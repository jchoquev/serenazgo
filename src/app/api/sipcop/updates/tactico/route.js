import { NextResponse } from "next/server";
import { SipCop,Tactico } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";
import { ConfigSipcop } from "@/models/default";
import moment from "moment";
import { ObjectId } from "mongodb";

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const filtro =  {FHeliminar:null,_id:{$in:Array.from(searchParams.values("Tactico[]"))}};
        await connectDB();
        const resp= await Tactico.find(filtro);
        return NextResponse.json({ok:Boolean(resp),msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}

export async function POST(request){
    try {
        const {_id,Direccion,HLlegada,Observaciones,Posicion,Revisar}= await request.json();
        let SipcopFound;
        await connectDB(); 
        if(ObjectId.isValid(_id)){
            SipcopFound=await SipCop.findById(_id)
            if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        }else{
            return NextResponse.json({ok:false,msg:"Elemento incorrecto"},{status:400});
        }
        const config=await ConfigSipcop.findOne({});
        const HSeira = moment(HLlegada, "HH:mm:ss").add(config.TACminutos, 'minutes').format("HH:mm:ss");
        const update={_idSipCop:_id,Direccion,Posicion,HLlegada,HSeira,Observaciones:Observaciones||"",Posicion,Revisar:Boolean(Revisar)}
        const svTactico= await (new Tactico(update)).save();
        const sipcop= await SipCop.findOneAndUpdate({_id},{Tactico:[svTactico._id].concat(SipcopFound.Tactico)},{ new: true });
        return NextResponse.json({ok:true,msg:sipcop});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const {_id,Direccion,HLlegada,HSeira,Observaciones,Posicion,Revisar,Completo}= await request.json();
        await connectDB();
        const TacticoFound=await Tactico.findById(_id)
        if(!TacticoFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        const update={
            Direccion,
            HLlegada,
            HSeira,
            Observaciones:Observaciones||"",
            Posicion,
            Revisar:Boolean(Revisar),
            Completo:Boolean(Completo)
        }
        const fTactico= await Tactico.findOneAndUpdate({_id},update,{ new: true });
        return NextResponse.json({ok:true,msg:fTactico});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
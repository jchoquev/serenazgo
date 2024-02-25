import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { OpIncidencia } from "@/models/default";
import { TipoVia,TipoZona,Origen } from "@/models/select";
//

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const option=searchParams.get('option')
        let resp;
        await connectDB();
        if(option==='Ocurrencia'){ 
            resp=await OpIncidencia.find({FHeliminar:null}).select();
            resp=resp.map((item)=>({value:item._id,label:item.Value,Tipo:item.Tipo,subTipo:item.subTipo}))
        }else if(option==='TipoVia'){ 
            resp=await TipoVia.find().select();
            resp=resp.map((item)=>({value:item._id,label:item.Value}))
        }else if(option==='TipoZona'){ 
            resp=await TipoZona.find().select();
            resp=resp.map((item)=>({value:item._id,label:item.Value}))
        }else if (option==='Origen'){ 
            resp=await Origen.find().select();
            resp=resp.map((item)=>({value:item._id,label:item.Value}))
        }
        return NextResponse.json({ok:Boolean(resp),msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
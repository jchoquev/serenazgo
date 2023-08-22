import { NextResponse } from "next/server";
import { PuntosTactico } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function GET(request,{ params }){
    try {
        await connectDB();
        const page=params.index;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const searchTerm={FHeliminar: null}
        const resp = await PuntosTactico.find(searchTerm).sort({ Direccion: 1 }).skip(skip).limit(perPage);
        const totalItems = await PuntosTactico.countDocuments(searchTerm);
        const totalPages = Math.ceil(totalItems / perPage);
        return NextResponse.json({ok:true,msg:resp,totalPages:totalPages});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
/*

const PuntosTacticoSchema=new Schema({
    Direccion:{type:String,require:[true]},
    Latitud:{type:Number,require:[true]},
    Longitud:{type:Number,require:[true]},
    Activo:{type:Boolean,default:true},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false}
},{ collection: 'TacticoCoordenada' });
*/
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { Incidencia } from "@/models/sipcop";
import { SipCop } from "@/models/sipcop";
//DELETE
import { Handy } from "@/models/default";
export async function GET(request){
    const { searchParams } = new URL(request.url);
    const iSelect=searchParams.get('filtro')
    let filtro; 
    try {
        await connectDB();
        if(iSelect==="porLista") filtro =  {FHeliminar:null,_id:{$in:searchParams.getAll("Incidencia[]")}};
        const resp= await Incidencia.find(filtro).sort({ FHregistro: 1 });
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const {_id,_idSipCop,update,...data}=await request.json();
        let resp;
        if(update===false){
            const SipcopFound=await SipCop.findById(_idSipCop)
            if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
            const {_id:_idIncidencia}= await (new Incidencia({...data,_idSipCop})).save();
            resp= await SipCop.findOneAndUpdate({_id:_idSipCop},{Incidencia:[_idIncidencia].concat(SipcopFound.Incidencia)},{ new: true });
        }else if(update===true){
            const IncidenciaFound=await Incidencia.findById(_id)
            if(!IncidenciaFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
            resp= await Incidencia.findOneAndUpdate({_id},data,{ new: true });
        }else{
            return NextResponse.json({ok:false,msg:"Ocurrio un error..."},{status:400});
        }
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
/*
const coordSchema=new Schema({
    Latitud:{type:Number},
    Longitud:{type:Number}
},{ _id: false });
Coordenadas
_idSipCop:{
        type:ObjectId,
        ref: 'SipCop',
        default:null
    },
    HoraNotificacion:{type:String,default:null},
    HoraLlegada:{type:String,default:null},
    HoraSeFue:{type:String,default:null},
    Ubicacion:{type:String},
    Coordenadas:{type:coordSchema,default:{}},
    Descripcion:{type:String},
    TipoVia:{type:String},
    Direccion:{type:String},
    Ocurrencia:{type:TacticOcurrencia},
    TipoZona:{type:String},
    SIPCOP:{type:Boolean,default:false},
    Turno:{type:String},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
*/

export async function PUT(request){
    try {
        const Group= await request.json();
        const update={
            Numero:Group.Numero,
            Activo:Group.Activo,
            Observacion:Group.Observacion
        }
        await connectDB();
        const HandyFound = await Handy.findOne({_id:Group._id});
        if(!HandyFound) return NextResponse.json({ok:false,msg:"El grupo no existe..."},{status:400});
        const handy= await Handy.findOneAndUpdate({_id:Group._id},update,{ new: true });
        return NextResponse.json({ok:true,msg:handy});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const HandyFound = await Handy.findOne({_id});
        if(!HandyFound) return NextResponse.json({ok:false,msg:"El grupo no existe..."},{status:400});
        const handy= await Handy.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:handy});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}


import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        
        const filtro = {NDocumento: searchParams.get("NDocumento")};
        console.log(filtro)
        await connectDB();
        const resp= await Staff.findOne(filtro).select("NDocumento fullNombres NCelular Cargo.Cargo");
        return NextResponse.json({ok:true,msg:resp});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo de nuevo..."},{status:400})
    }
}
/*
const staffSchema =new Schema({
    NDocumento:{
        type:String,
        unique:true,
        required:[true,'El usuario es un campo requerido...'],
    },
    Password:{
        type:String,
        required:[true,'La clave es un campo requerido...'],
        select:false
    },
    Nombres:{type:String},
    ApePaterno:{type:String},
    ApeMaterno:{type:String},
    fullNombres:{type:String,default:''},
    NCelular:{type:String},
    Cargo:{type:CargoSchema,required:[true]},
    Grupo:{type:GrupoSchema,required:[true]},
    Activo:{type:Boolean,default:true},
    uPassword:{type:String,default:null},
    LibreDesde:{type:Date,default:null},
    LibreHasta:{type:Date,default:null},
    FHregistro:{type:Date,select:false,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection: 'Users'});
*/
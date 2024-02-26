import { Schema, model ,models} from "mongoose";
const AsistenciaShema =new Schema({
    UserId:{type:String, require:[true]},
    fullNames:{type:String, require:[true]},
    hEntrada:{type:Date,default:null},
    hSalida:{type:Date,default:null},
    Observacion:{type:String, default:""},
    Protegido:{type:Boolean, default:false},
    FHregistro:{type:Date,select:false,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection:"Attendances"});

const attendance= models.attendance||model("attendance",AsistenciaShema);
export {attendance};
import { ObjectId } from "mongodb";
import { Schema, model ,models} from "mongoose";
const AsistenciaShema =new Schema({
    UserId:{type:ObjectId, require:[true]},
    fullNames:{type:String, require:[true]},
    Cargo:{type:String, require:[true]},
    Estado:{type:new Schema({
        Puntual:{type:Boolean,default:false},
        Tarde:{type:Boolean,default:false},
        Falta:{type:Boolean,default:false},
    },{ _id: false })},
    Observacion:{type:String, default:""},
    Protegido:{type:Boolean, default:false},
    FHregistro:{type:Date,select:false,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection:"Attendances"});

const attendance= models.attendance||model("attendance",AsistenciaShema);
export {attendance};
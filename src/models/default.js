import { Schema, model ,models} from "mongoose";

const TurnoSchema =new Schema({
    Value:{type:String},
    Anterior:{type:String},
    dAnterior:{type:Boolean},
    Grupos:{
        type:Boolean,
        default:false,
    }
},{ collection: 'Turno' });

const GrupoSchema =new Schema({
    Value:{type:String},
    Turno:{type:TurnoSchema,default:null},
    Desde:{type:Date},
    Hasta:{type:Date}
});

const VehiculoSchema =new Schema({
    Placa:{type:String},
    Numero:{type:Number},
    Activo:{type:Boolean},
    Insert:{
        type:Date,
        default: new Date(),
    }
});

const Turno= models.Turno||model("Turno",TurnoSchema);
const Grupo= models.Grupo||model("Grupo",GrupoSchema);
const Vehiculo= models.Vehiculo||model("Vehiculo",VehiculoSchema);
export {Turno,Grupo,Vehiculo,GrupoSchema};
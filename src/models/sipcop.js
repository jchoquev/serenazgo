import { ObjectId } from "mongodb";
import { Schema, model ,models} from "mongoose";

const ResponsableSchema=new Schema({
    Nombres:{type:String},
    Cargo:{type:String},
    DNI:{type:String},
    NCelular:{type:String},
    Conductor:{type:Boolean},
    FHregistro:{type:Date,default:Date.now},
},{ _id: false });

const IncidenciaSchema=new Schema({
    Direccion:{type:String},
    HLlegada:{type:String},
    HSeira:{type:String},
    Activo:{type:Boolean},
    Observaciones:{type:String},
    FHregistro:{type:Date,default:Date.now},
},{ _id: false });

const TacticOcurrencia=new Schema({
    Tipo:{type:String},
    subTipo:{type:String},
    Value:{type:String}
},{ _id: false });

const TacticoSchema=new Schema({
    HoraLlegada:{type:String},
    HoraSeFue:{type:String},
    Ubicacion:{type:String},
    Descripcion:{type:String},
    Ocurrencia:{type:TacticOcurrencia},
    TipoVia:{type:String},
    Direccion:{type:String},
    TipoZona:{type:String},
    SIPCOP:{type:Boolean,default:false},
    Turno:{type:String},
    FHregistro:{type:Date,default:Date.now},
},{ _id: false });

const SipCopSchema =new Schema({
    IdVehiculo:{type:ObjectId,require:[true]},
    Numero:{type:Number,require:[true]},
    IdPlaca:{type:String,require:[true]},
    TipoVehiculo:{type:String,require:[true]},
    DNIConductor:{type:String,default:''},
    Responsables:{type:[ResponsableSchema],default:[]},
    KMinicial:{type:Number,default:0},
    KMfinal:{type:Number,default:0},
    OdometroInicial:{type:Number,default:0},
    OdometroFinal:{type:Number,default:0},
    Zona:{type:String,default:''},
    IdTurno:{type:ObjectId,require:[true]},
    Turno:{type:String,require:[true]},
    Kilometraje:{type:Number,default:0},
    Tiempo:{type:Number,default:0},
    SCFHActualizacion:{type:String,default:''},
    Incidencias:{type:[IncidenciaSchema],default:[]},
    Tactico:{type:[TacticoSchema],default:[]},
    TacHoraFin:{type:String},
    Activo:{type:Boolean,default:false},
    Observacion:{type:String},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Sipcop' });

const SipCop= models.SipCop||model("SipCop",SipCopSchema);
export {SipCop};
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

const PuntosTacticoSchema=new Schema({
    Direccion:{type:String,require:[true]},
    Latitud:{type:Number,require:[true]},
    Longitud:{type:Number,require:[true]},
    Activo:{type:Boolean,default:true},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false}
},{ collection: 'TacticoCoordenada' });

const TacticoSchema=new Schema({
    Direccion:{type:String,require:[true]},
    Posicion:{type:String,require:[true]},
    HLlegada:{type:String,require:[true]},
    HSeira:{type:String,require:[true]},
    Completo:{type:Boolean,default:false},
    Revisar:{type:Boolean,default:false},
    Observaciones:{type:String},
    FHregistro:{type:Date,default:Date.now},
});

const TacticOcurrencia=new Schema({
    Tipo:{type:String},
    subTipo:{type:String},
    Value:{type:String}
},{ _id: false });

const IncidenciaSchema=new Schema({
    HoraLlegada:{type:String,require:[true]},
    HoraSeFue:{type:String,require:[true]},
    Ubicacion:{type:String},
    Descripcion:{type:String},
    TipoVia:{type:String},
    Direccion:{type:String},
    Ocurrencia:{type:TacticOcurrencia},
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
const PuntosTactico= models.PuntosTactico||model("PuntosTactico",PuntosTacticoSchema);
export {SipCop,PuntosTactico};
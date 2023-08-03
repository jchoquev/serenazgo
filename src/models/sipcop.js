import { Schema, model ,models} from "mongoose";

const ResponsableSchema=new Schema({
    Nombres:{type:String},
    Cargo:{type:String},
    DNI:{type:String},
    NCelular:{type:String},
    Conductor:{type:Boolean}
},{ _id: false });

const IncidenciaSchema=new Schema({
    Direccion:{type:String},
    HLlegada:{type:String},
    HSeira:{type:String},
    Activo:{type:Boolean},
    Observaciones:{type:String}
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
},{ _id: false });

const SipCopSchema =new Schema({
    Numero:{type:Number},
    IdPlaca:{type:String},
    DNIConductor:{type:String},
    Responsables:{type:[ResponsableSchema],default:[]},
    KMinicial:{type:Number},
    KMfinal:{type:Number},
    OdometroInicial:{type:Number},
    OdometroFinal:{type:Number},
    Zona:{type:String},
    Turno:{type:String},
    Kilometraje:{type:Number},
    Tiempo:{type:Number},
    SCFHActualizacion:{type:String},
    Incidencias:{type:[IncidenciaSchema],default:[]},
    Tactico:{type:[TacticoSchema],default:[]},
    TacHoraFin:{type:String},
    Activo:{
        type:Boolean,
        default:false,
    },
    Observacion:{type:String},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Sipcop' });

const SipCop= models.SipCop||model("SipCop",SipCopSchema);
export {SipCop};
import { ObjectId } from "mongodb";
import { Schema, model ,models} from "mongoose";
import  uuid  from "uuid";

const ResponsableSchema=new Schema({
    Nombres:{type:String},
    Cargo:{type:String},
    DNI:{type:String},
    NCelular:{type:String},
    Conductor:{type:Boolean},
    FHregistro:{type:Date,default:Date.now(),select:false},
    FHeliminar:{type:Date,default:null}
});

const RoleSchema=new Schema({
    Value:{type:String},
    protected:{type:Boolean, default:false}
});

const AccesoSchema=new Schema({
    Value:{type:String},
    
});

const PuntosTacticoSchema=new Schema({
    Direccion:{type:String,require:[true]},
    Latitud:{type:Number,require:[true]},
    Longitud:{type:Number,require:[true]},
    Activo:{type:Boolean,default:true},
    FHregistro:{type:Date,default:Date.now(),select:false},
    FHactualizacion:{type:Date,default:Date.now(),select:false},
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
    _idSipcop:{
        type:ObjectId,
        ref: 'SipCop',
        require:[true],
    },
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
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
});

const kmSchema=new Schema({
    Inicial:{type:Number,default:0},
    Final:{type:Number,default:0},
    Verificado:{type:Boolean,default:false},
    Nombres:{type:String,default:null},
},{ _id: false })

const SipCopSchema =new Schema({
    IdVehiculo:{type:ObjectId,require:[true]},
    Numero:{type:Number,require:[true]},
    IdPlaca:{type:String,require:[true]},
    TipoVehiculo:{type:String,require:[true]},
    DNIConductor:{type:String,default:''},
    Responsables:{type:[ResponsableSchema],default:[]},
    Kilometraje:{type:kmSchema,default:{Inicial:0,Final:0,Verificado:false,Nombres:null}},
    OdometroInicial:{type:Number,default:0},
    OdometroFinal:{type:Number,default:0},
    Zona:{type:String,default:''},
    IdTurno:{type:ObjectId,require:[true]},
    Turno:{type:String,require:[true]},
    KilometrajeSC:{type:Number,default:0},
    TiempoSC:{type:Number,default:0},
    SCFHActualizacion:{type:String,default:''},
    Tactico:{type:[TacticoSchema],default:[]},
    TacHoraFin:{type:String},
    Activo:{type:Boolean,default:false},
    Observacion:{type:String},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Sipcop' });

const UserAndVehicleSchema=new Schema({
    idUser:{
        type:ObjectId,
        require:[true]
    },
    IdVehicle:{
        type:ObjectId,
        require:[true]
    },
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'UserAndVehicle' })

UserAndVehicleSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});

const SipCop= models.SipCop||model("SipCop",SipCopSchema);
const PuntosTactico= models.PuntosTactico||model("PuntosTactico",PuntosTacticoSchema);
const UserAndVehicle= models.UserAndVehicle||model("UserAndVehicle",UserAndVehicleSchema);
const Incidencia= models.Incidencia||model("Incidencia",IncidenciaSchema);

export {SipCop,PuntosTactico,UserAndVehicle,Incidencia};
import { ObjectId } from "mongodb";
import { Schema, model ,models} from "mongoose";
import { selectSchema } from "./select";
import { Mixed } from "mongoose";
import { Vehiculo } from "./default";
import { Staff } from "./staff";

const ResponsableSchema=new Schema({
    _idSipCop:{
        type:ObjectId,
        ref: 'SipCop',
        default:null,
    },
    _idUser:{
        type:ObjectId,
        ref: 'Staff',
        default:null,
    },
    _idVehicle:{
        type:ObjectId,
        ref: 'Vehiculo',
        default:null
    },
    DNI:{type:String},
    Nombres:{type:String},
    Rol:{type:selectSchema,default:{}},
    NCelular:{type:String},
    FHregistro:{type:Date,default:Date.now(),select:false},
    FHactualizacion:{type:Date,default:Date.now(),select:false},
    FHeliminar:{type:Date,default:null}
},{ collection:'Responsable'});

ResponsableSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
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
    _idSipCop:{
        type:ObjectId,
        ref: 'SipCop',
        require:[true]
    },
    Direccion:{type:String,require:[true]},
    Posicion:{type:String,require:[true]},
    HLlegada:{type:String,require:[true]},
    HSeira:{type:String,require:[true]},
    Completo:{type:Boolean,default:false},
    Revisar:{type:Boolean,default:false},
    Observaciones:{type:String},
    FHregistro:{type:Date,default:Date.now},
},{ collection: 'Tacticos' });

const TacticOcurrencia=new Schema({
    Tipo:{type:String},
    subTipo:{type:String},
    Value:{type:String}
},{ _id: false });

const coordSchema=new Schema({
    Latitud:{type:Number},
    Longitud:{type:Number}
},{ _id: false });

const IncidenciaSchema=new Schema({
    _idSipCop:{
        type:ObjectId,
        ref: 'SipCop',
        require:[true]
    },
    HoraNotificacion:{type:String,default:null},
    HoraLlegada:{type:String,default:null},
    HoraSeFue:{type:String,default:null},
    Ubicacion:{type:String,default:""},
    Coordenadas:{type:coordSchema,default:{}},
    Descripcion:{type:String,default:""},
    TipoVia:{type:Mixed,default:{}},
    Direccion:{type:String},
    Ocurrencia:{type:Mixed,default:{}},
    TipoZona:{type:Mixed,default:{}},
    SIPCOP:{type:Boolean,default:false},
    Turno:{type:String,default:""},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Incidencias' });

IncidenciaSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
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
    Responsables:{type:[ObjectId],default:[]},
    Kilometraje:{type:kmSchema,default:{Inicial:0,Final:0,Verificado:false,Nombres:null}},
    OdometroInicial:{type:Number,default:0},
    OdometroFinal:{type:Number,default:0},
    Zona:{type:String,default:''},
    IdTurno:{type:ObjectId,require:[true]},
    Turno:{type:String,require:[true]},
    KilometrajeSC:{type:Number,default:0},
    TiempoSC:{type:Number,default:0},
    SCFHActualizacion:{type:String,default:''},
    Tactico:{type:[ObjectId],default:[]},
    Incidencia:{type:[ObjectId],default:[]},
    TacHoraFin:{type:String},
    Activo:{type:Boolean,default:false},
    Observacion:{type:String},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Sipcop' });


const AccesSchema=new Schema({
    _id: { type: Number, autoIncrement: true },
    Descripcion:{type:String,default:""},  
    Acceso:{type:Boolean,default:false},
})

const RoleSchema=new Schema({
    Value:{type:String,default:"",require:[true]},
    Access:{type:[AccesSchema],default:[]},
    Protected:{type:Boolean,default:false},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Roles' })

RoleSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});


const SipCop= models.SipCop||model("SipCop",SipCopSchema);
const PuntosTactico= models.PuntosTactico||model("PuntosTactico",PuntosTacticoSchema);
const Incidencia= models.Incidencia||model("Incidencia",IncidenciaSchema);
const Role=models.Role||model("Role",RoleSchema);
const Responsable=models.Responsable||model("Responsable",ResponsableSchema);
const Tactico=models.Tactico||model("Tactico",TacticoSchema);

export {SipCop,PuntosTactico,Incidencia,Role,Responsable,Tactico};
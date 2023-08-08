import { Schema, model ,models} from "mongoose";

const TurnoSchema =new Schema({
    Turno:{type:String},
    HEntrada:{type:String},
    HSalida:{type:String},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Turnos' });

TurnoSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});

const GrupoSchema =new Schema({
    Activo:{type:Boolean,default:true},
    Grupo:{type:String},
    Turno:{type:TurnoSchema.set("_id", false),default:null},
    Desde:{type:Date},
    Hasta:{type:Date},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection:'Groups'});

GrupoSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
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

const ConfigShema=new Schema({
    SIPkm:{type:Number},
    SIPminutos:{type:Number},
    TACminutos:{type:Number},
    TACminutosadd:{type:Number},
    Incidencias:{type:Number},
    Tactico:{type:Number},
    WDRuta:{type:String},
    WDSession:{type:String},
},{collection: 'Configuracion'});

const ZoneSchema =new Schema({
    Zona:{type:String, default:""},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{collection:"Zones"});

ZoneSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});

const Turno= models.Turno||model("Turno",TurnoSchema);
const Grupo= models.Grupo||model("Grupo",GrupoSchema);
const Vehiculo= models.Vehiculo||model("Vehiculo",VehiculoSchema);
const Config= models.Config||model("Config",ConfigShema);
const Zones= models.Zones||model("Zones",ZoneSchema);
export {Turno,Grupo,Vehiculo,Config,Zones,GrupoSchema};
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
    Turno:{type:TurnoSchema,default:null},
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


const typesVehicleSchema=new Schema({
    Tipo:{type:String},
    Prioridad:{type:Number,default:1},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false}
},{collection:"TypesVehicle"});

typesVehicleSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});

/*typesVehicleSchema.post('findOneAndUpdate',async function (doc) {
    await Vehiculo.updateMany({'Tipo._id':doc._id},{Tipo:doc.Tipo,Prioridad:doc.Prioridad});
});*/

const VehiculoSchema =new Schema({
    Numero:{type:Number},
    Placa:{type:String},
    Activo:{type:Boolean},
    Tipo:{type:new Schema({_id:{type:Object},Tipo:{type:String},Prioridad:{type:Number}})},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false}
},{collection:"Vehicles"});

VehiculoSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
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

const HandySchema =new Schema({
    Numero:{type:String, default:""},
    Activo:{type:Boolean, default:true},
    Observacion:{type:String, default:""},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection:"Handys"});

HandySchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});

const OpIncidenciaSchema =new Schema({
    Value:{type:String, default:""},
    Tipo:{type:String, default:""},
    subTipo:{type:String, default:""},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection:"OpIncidencias"});

OpIncidenciaSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});

const ConfigSchema =new Schema({
    SIPkm:{type:Number, default:0},
    SIPminutos:{type:Number, default:0},
    TACminutos:{type:Number, default:0},
    TACminutosadd:{type:Number, default:0},
    Incidencias:{type:Number, default:0},
    Tactico:{type:Number, default:0},
    WDRuta:{type:String,default:""},
    WDSession:{type:String,default:""},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection:"Configuracion"});

const Turno= models.Turno||model("Turno",TurnoSchema);
const Grupo= models.Grupo||model("Grupo",GrupoSchema);
const Vehiculo= models.Vehiculo||model("Vehiculo",VehiculoSchema);
const Config= models.Config||model("Config",ConfigShema);
const Zones= models.Zones||model("Zones",ZoneSchema);
const Handy= models.Handy||model("Handy",HandySchema);
const typesVehicle= models.typesVehicle||model("typesVehicle",typesVehicleSchema);
const ConfigSipcop= models.ConfigSipcop||model("ConfigSipcop",ConfigSchema);
const OpIncidencia=models.OpIncidencia||model("OpIncidencia",OpIncidenciaSchema);
export {Turno,Grupo,Vehiculo,Config,Zones,Handy,typesVehicle,ConfigSipcop,OpIncidencia,GrupoSchema};
import { Schema, model ,models} from "mongoose";
import {GrupoSchema} from "./default";

const CargoSchema =new Schema({
    Cargo:{type:String, default:""},
    Nivel:{type:Number},
    FHregistro:{type:Date,default:Date.now,select:false},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection:"Positions"});

CargoSchema.pre('findOneAndUpdate',function(next){
    const update = this.getUpdate();
    update.FHactualizacion=Date.now();
    next();
});



const staffSchema =new Schema({
    NDocumento:{
        type:String,
        unique:true,
        required:[true,'El usuario es un campo requerido...'],
    },
    Password:{
        type:String,
        required:[true,'La clave es un campo requerido...'],
        select:false
    },
    Nombres:{type:String},
    ApePaterno:{type:String},
    ApeMaterno:{type:String},
    fullNombres:{type:String,default:''},
    NCelular:{type:String},
    Cargo:{type:CargoSchema,required:[true]},
    Grupo:{type:GrupoSchema,required:[true]},
    Activo:{type:Boolean,default:true},
    uPassword:{type:String,default:null},
    LibreDesde:{type:Date,default:null},
    LibreHasta:{type:Date,default:null},
    FHregistro:{type:Date,select:false,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now,select:false},
    FHeliminar:{type:Date,default:null,select:false},
},{collection: 'Users'});

staffSchema.pre('save',function (next) {
    this.fullNombres = `${this.ApePaterno} ${this.ApeMaterno} ${this.Nombres}`;
    next()
});

staffSchema.pre('updateOne',function (next) {
    const { ApePaterno, ApeMaterno, Nombres } = this._update;
    this._update.fullNombres = `${ApePaterno} ${ApeMaterno} ${Nombres}`;
    next();
});

const Staff= models.Staff||model("Staff",staffSchema);
const Positions= models.Positions||model("Positions",CargoSchema);
export {Staff,Positions};
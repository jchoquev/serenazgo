import { Schema, model ,models} from "mongoose";
import {GrupoSchema} from "./default";

const userSchema =new Schema({
    User:{
        type:String,
        unique:true,
        required:[true,'El usuario es un campo requerido...'],
    },
    Password:{
        type:String,
        required:[true,'La clave es un campo requerido...'],
        select:false,
        //minLength:[6,"Minimo la clave son 3 caracteres ..."],
        //maxLength:[12,"Maximo la clave son 12 caracteres ..."],
    },
    Nombre:{type:String},
    ApePaterno:{type:String},
    ApeMaterno:{type:String},
    fullNombres:{type:String},
    DNI:{type:String},
    NCelular:{type:String},
    Grupo:{
        type:GrupoSchema,
        default:null,
    },
    Activo:{
        type:Boolean,
        default:true,
    },
    Insert:{
        type:Date,
        default:new Date(),
    },
    Update:{
        type:Date,
        default:new Date(),
    },
    Delete:{
        type:Boolean,
        default:false,
    },
},{collection: 'Usuario'});

const User= models.Usuario||model("Usuario",userSchema);
export default User;
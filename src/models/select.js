import { ObjectId } from "mongodb";
import { Schema, model ,models} from "mongoose";

const selectSchema=new Schema({
    value:{type:ObjectId},
    label:{type:String},
},{ _id: false });


const TipoViaSchema =new Schema({
    Value:{type:String, default:""},
},{collection:"TipoVia"});


const TipoZonaSchema =new Schema({
    Value:{type:String, default:""},
},{collection:"TipoZona"});


const Select= models.Select||model("Select",selectSchema);
const TipoVia= models.TipoVia||model("TipoVia",TipoViaSchema);
const TipoZona= models.TipoZona||model("TipoZona",TipoZonaSchema);
export {Select,TipoVia,TipoZona,selectSchema};
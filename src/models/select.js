import { ObjectId } from "mongodb";
import { Schema, model ,models} from "mongoose";

const selectSchema=new Schema({
    value:{type:ObjectId},
    label:{type:String},
},{ _id: false });

const Select= models.Select||model("Select",selectSchema);
export {Select,selectSchema};
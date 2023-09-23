import { NextResponse } from "next/server";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function GET(request,{ params }){
    try {
        await connectDB();
        const {pages,find,perPage}=params;
        const skip = (pages - 1) * perPage;
        const searchTerm={
            FHeliminar: null,
            $or:[
                {NDocumento:{ $regex: find, $options: "i" }},
                {fullNombres:{ $regex: find, $options: "i" }},
                {NCelular:{ $regex: find, $options: "i" }},
                {'Cargo.Cargo':{ $regex: find, $options: "i" }},
                {'Grupo.Grupo':{ $regex: find, $options: "i" }}
            ]
        }
        const resp = await Staff.find(searchTerm).sort({ fullNombres: 1 }).skip(skip).limit(perPage);
        const totalItems = await Staff.countDocuments(searchTerm);
        const totalPages = Math.ceil(totalItems / perPage);
        return NextResponse.json({ok:true,Data:resp,totalPages:totalPages});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

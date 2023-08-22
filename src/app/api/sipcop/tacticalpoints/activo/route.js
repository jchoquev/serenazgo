import { NextResponse } from "next/server";
import { SipCop } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";

export async function PUT(request){
    try {
        const {_id,Activo,_idSipcop}= await request.json();
        await connectDB();
        const SipcopFound = await SipCop.findById(_idSipcop);
        if(!SipcopFound) return NextResponse.json({ok:false,msg:"El elemento no existe en el SIPCOP..."},{status:400});
        const update=await SipcopFound.Tactico.map((item)=>{
            const updatedItem = JSON.parse(JSON.stringify(item));
            if(String(item._id)===String(_id)) return {...updatedItem,Completo:Activo}; 
            return item;
        })
        const sipcop= await SipCop.findOneAndUpdate({_id:_idSipcop},{Tactico:update},{ new: true });
        return NextResponse.json({ok:true,msg:sipcop});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
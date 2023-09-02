import { NextResponse } from "next/server";
import { SipCop,UserAndVehicle } from "@/models/sipcop";
import { connectDB } from "@/libs/mongodb";
import { ObjectId } from "mongodb";
export async function POST(request){
    try {
        const {_id,_idList,Nombres,Cargo,DNI,NCelular,Conductor,update,idUser}=await request.json();
        await connectDB();
        const SipcopFound=await SipCop.findById(_id)
        if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
        if(update===true){
            const copiedObj = JSON.parse(JSON.stringify(SipcopFound.Responsables));
            const update=copiedObj&&copiedObj.map((item)=>{
                if(String(item._id)==String(_idList)) return {...item,Nombres,Cargo,DNI,NCelular,Conductor};
                return item;
            })
            const sipcop= await SipCop.findOneAndUpdate({_id},{Responsables:update},{ new: true });
            return NextResponse.json({ok:true,msg:sipcop});
        }else if(update===false){
            if(ObjectId.isValid(idUser)) await (new UserAndVehicle({idUser,IdVehicle:_id})).save();
            const update={Nombres,Cargo,DNI,NCelular,Conductor}
            SipcopFound.Responsables.push(update);
            const sipcop= await SipCop.findOneAndUpdate({_id},{Responsables:SipcopFound.Responsables},{ new: true });
            return NextResponse.json({ok:true,msg:sipcop});
        }
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
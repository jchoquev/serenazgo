import { NextResponse } from "next/server";
import { SipCop, Responsable} from "@/models/sipcop";
import { Vehiculo } from "@/models/default";
import { Staff } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";
import { ObjectId } from "mongodb";
export async function PUT(request){
    try {
        await connectDB();
        const {_id,_idSipCop,_idVehicle,_idUser,DNI,NCelular,Nombres,Rol,update}=await request.json();
        let data={DNI,NCelular,Nombres,Rol};
        let {SipcopFound,VehiculoFound,UserFound}={}
        if(!update){
            if(ObjectId.isValid(_idSipCop)) {
                data={...data,_idSipCop}
                SipcopFound=await SipCop.findById(_idSipCop)
                if(!SipcopFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
            };
            if(ObjectId.isValid(_idVehicle)){ 
                data={...data,_idVehicle}
                VehiculoFound=await Vehiculo.findById(_idVehicle)
                if(!VehiculoFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
            };
            if(ObjectId.isValid(_idUser)){
                data={...data,_idUser};
                UserFound=await Staff.findById(_idUser)
                if(!UserFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
            } 
            if(SipcopFound&&VehiculoFound){
                const {_id}=await (new Responsable(data)).save();
                const sipcop= await SipCop.findOneAndUpdate({_id:SipcopFound._id},{Responsables:[_id].concat(SipcopFound.Responsables)},{ new: true });
                return NextResponse.json({ok:true,msg:sipcop},{status:200});
            }else{
                return NextResponse.json({ok:true,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
            }
        }else if(update){
            const ResponsablesFound=await Responsable.findById(_id)
            if(!ResponsablesFound) return NextResponse.json({ok:false,msg:"No existe el elemento"},{status:400});
            const listResponsables= await Responsable.findOneAndUpdate({_id},data,{ new: true });
            return NextResponse.json({ok:true,msg:listResponsables},{status:200});
        }else{
            return NextResponse.json({ok:true,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
        }
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}
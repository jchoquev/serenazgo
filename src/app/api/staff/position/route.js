import { NextResponse } from "next/server";
import { Positions } from "@/models/staff";
import { connectDB } from "@/libs/mongodb";

export async function GET(request){
    try {
        await connectDB();
        const pos = await Positions.find({FHeliminar:null}).sort({Nivel:1,Cargo:1});
        return NextResponse.json({ok:true,msg:pos});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function POST(request){
    try {
        const Group=await request.json();
        const send={
            Cargo:Group.Cargo.toUpperCase(),
            Nivel:Group.Nivel,
        }
        await connectDB();
        const cargo= await (new Positions(send)).save();
        return NextResponse.json({ok:true,msg:cargo});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function PUT(request){
    try {
        const Group= await request.json();
        const update={
            Cargo:Group.Cargo.toUpperCase(),
            Nivel:Group.Nivel,
        }
        await connectDB();
        const PositionFound = await Positions.findOne({_id:Group._id});
        if(!PositionFound) return NextResponse.json({ok:false,msg:"El Cargo no existe..."},{status:400});
        const cargo= await Positions.findOneAndUpdate({_id:Group._id},update,{ new: true });
        return NextResponse.json({ok:true,msg:cargo});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}

export async function DELETE(request){
    try {
        const {_id}= await request.json();
        await connectDB();
        const PositionFound = await Positions.findOne({_id});
        if(!PositionFound) return NextResponse.json({ok:false,msg:"El Cargo no existe..."},{status:400});
        const cargo= await Positions.findOneAndUpdate({_id},{FHeliminar:Date.now()},{ new: true });
        return NextResponse.json({ok:true,msg:cargo});
    } catch (error) {
        return NextResponse.json({ok:false,msg:"Ocurrio un error, intentelo mas tarde..."},{status:400});
    }
}


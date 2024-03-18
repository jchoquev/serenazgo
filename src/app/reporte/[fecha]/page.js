"use client"
import React, { useState,useEffect } from "react";
import { Button,Modal } from "flowbite-react";
import moment from "moment";
import axios from "axios";
export default function Reporte({params}){
    const [data, setData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [respon, setResponsable] = useState([]);
    const fecha=moment(params.fecha, "DD-MM-YYYY",true)
    const i=0
    
    useEffect(()=>{
        if(fecha.isValid()) fetchData(fecha);
    },[params.fecha]);

    const fetchData= (param)=>{
        axios.get(`${process.env.API_URL}/reporte`,{params:params}).then(({data,status})=>{
          const {ok,msg}=data
          if(!ok) setData(null);
          setData(msg);
          console.log(msg)
        }).catch((e)=>{setData(null)});
    }

    if(!fecha.isValid()){
        return <>
            Fecha Invalida
        </>
    }

    return data&&data.Registro&&data.Registro.map((item)=>{
        const {Responsables,Tactico,Incidencia }=item
        return  <>
            <div className="container mx-auto text-[16px] ">
                    <table className="border-none w-full">
                        <tbody>
                            {i===0&&<tr>
                                <td></td>
                                <td colSpan={3} className="text-center font-bold">
                                    <div className="bg-[#F24E29] text-zinc-100 font-bold rounded-t-2xl">
                                        TURNO {item.Turno||""}
                                    </div>
                                </td>
                            </tr>}
                            <TrDescripcion data={item} />
                            <TrResponsable listResponsables={Responsables} {...data} />
                            <TrIncidentes listOcurrencia={Incidencia} {...data}/>
                            <TrTacticos lisTactico={Tactico} {...data}/>
                        </tbody>
                    </table>
            </div>
            </>
    })
}

function TrDescripcion({data}){
    const {IdPlaca,TipoVehiculo,Numero,Kilometraje:{Inicial,Final},OdometroFinal,OdometroInicial}=data
    return <>
        <tr>
            <td className="border-none font-bold m-0">
                <div className="bg-slate-500 rounded-l-2xl p-1 text-center text-cyan-50">Descripcion</div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>NUMERO :</b>  {Numero}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>PLACA :</b>  {IdPlaca}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>TIPO VEHICULO :</b>  {TipoVehiculo}
                </div>
            </td>
        </tr>
        <tr>
            <td className="border-none font-bold m-0"> </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>KM INICIAL :</b>  {Inicial}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>KM FINAL :</b>  {Final}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>AVANCE (KM) :</b>  {(Number(Final)-Number(Inicial))}
                </div>
            </td>
        </tr>
        <tr>
            <td className="border-none font-bold m-0"> </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>KM INICIAL (SIPCOP) :</b> <br/>  {OdometroInicial}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>KM FINAL (SIPCOP) :</b> <br/>  {OdometroFinal}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                   <b>AVANCE (KM SIPCOP) :</b> <br/>  {(Number(OdometroFinal)-Number(OdometroInicial))}
                </div>
            </td>
        </tr>
    </>
}

function TrResponsable(data){
    const {listResponsables,Responsables}=data
    const encontrado = Responsables.filter((item) => listResponsables.indexOf(item._id) !== -1);
    let i=0
    return encontrado&&encontrado.map((item)=>{
        const {Rol,Nombres} = item
        const html= <tr>
            <td className="border-none font-bold m-0">
                { i===0&&<div className="bg-slate-500 rounded-l-2xl p-1 text-center text-cyan-50">Participantes</div> }
            </td>
            <td className="border-none m-0 ">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                    {Rol.label}
                </div>
            </td>
            <td colSpan={2} className="border-none m-0 ">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                    {Nombres}
                </div>
            </td>
        </tr>
        i++;
        return html;
    })
}


function TrTacticos(data){
    const {lisTactico,Tactico}=data
    const encontrado = Tactico.filter((item) => (lisTactico.indexOf(item._id) !== -1)&&(item.Completo===true));
    let i=0
    return encontrado&&encontrado.map((item,key)=>{
        const {Rol,Nombres} = item
        const html= <tr>
            <td className="border-none font-bold m-0">
                { i===0&&<div className="bg-slate-500 rounded-l-2xl p-1 text-center text-cyan-50">Tacticos</div> }
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                    ({key+1}) {item.Direccion}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                    {item.HLlegada}
                </div>
            </td>
            <td className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                    {item.HSeira}
                </div>
            </td>
        </tr>
        i++;
        return html;
    })
}

function TrIncidentes(data){
    const {listOcurrencia,Incidencia}=data
    const encontrado = Incidencia.filter((item) => (listOcurrencia.indexOf(item._id) !== -1));
    let i=0
    return encontrado&&encontrado.map((item,key)=>{
        const {Rol,Nombres} = item
        const html= <tr>
            <td className="border-none font-bold m-0">
                { i===0&&<div className="bg-slate-500 rounded-l-2xl p-1 text-center text-cyan-50">Ocurrencias</div> }
            </td>
            <td className="border-none m-0 p-0">
                <div className="h-full bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                    ({key+1}) {item.Direccion}
                </div>
            </td>
            <td colSpan={2} className="border-none m-0">
                <div className="bg-[#F2F2F2] border border-[#BFBFBF] border-solid p-1">
                    {item.Descripcion} <br/>
                    <span className="italic text-[.8rem] ">{item.HoraLlegada}</span>
                </div>
            </td>
        </tr>
        i++;
        return html;
    })
}

"use client"
import React, { useState,useEffect } from "react";
import moment from "moment";
import axios from "axios";
export default function Reporte({params}){
    const [data, setData] = useState(null);
    
    useEffect(()=>{
        let parametros;
        if(params.data.length===4){
            parametros={fecha:`${params.data[0]}/${params.data[1]}/${params.data[2]}`,turno:decodeURIComponent(params.data[3])}
            fetchData(parametros);
        }
    },[params.data]);

    const fetchData= (param)=>{
      axios.get(`${process.env.API_URL}/reporte`,{params:param}).then(({data,status})=>{
        if(status===400) setData(null);
        setData(data);
      }).catch(()=>{setData(null)});
    }

    if(params&&params.data.length!=4) return <>Ocurrio un error</>;
    return <>
        <div className="flex h-screen items-center justify-center">
            <table className="border-collapse">
                <thead>
                    <tr>
                        <td className="p-2 text-center font-bold text-white border-l border-b bg-[#011526]">EXTRACTO</td>
                        <td className="p-2 text-[#05C7F2] text-center font-bold  bg-[#011526] border-b">{moment().format("DD/MM/YYYY")}</td>
                        <td colSpan={2} className="p-2 text-center font-bold text-white border-l border-b bg-[#011526]">A.-M.-T.</td>
                        <td colSpan={3} className="p-2 text-center font-bold text-white border-l border-b bg-[#011526]">REPORTES</td>
                    </tr>
                    <tr>
                        <td className="p-2 text-center font-bold text-white border-l bg-[#011526]">NRO P</td>
                        <td className="p-2 text-center font-bold text-white bg-[#011526]">PLACA</td>
                        <td className="p-2 text-center font-bold text-white border-l bg-[#011526]">KM <br /> FALTANTE</td>
                        <td className="p-2 text-center font-bold text-white border-l bg-[#011526]">MINUTOS <br /> FALTANTE</td>
                        <td className="p-2 text-center font-bold text-white border-l bg-[#011526]">A</td>
                        <td className="p-2 text-center font-bold text-white border-l bg-[#011526]">M</td>
                        <td className="p-2 text-center font-bold text-white border-l bg-[#011526]">T</td>
                    </tr>
                </thead>
                <tbody>
                    {data&&data.ok&&data.msg.map((res)=>(<TableTr key={res._id} {...res}/>))}
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={7}>
                            <div className="text-center font-semibold w-[500px] bg-slate-200 p-2 rounded-3xl mt-1">
                                <p>ESTRACTO ACTUALIZADO SEGUN SIPCOP-M TURNO {decodeURIComponent(params.data[3])=="NOCHE"?"AMANECIDA":decodeURIComponent(params.data[3])} SIENDO LAS 
                                 <span className="font-bold p-1  text-lg rounded-lg ml-2 bg-[#8C0707] text-white"> {moment().format("HH:mm A")}</span>.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>;
}

function TableTr({Activo,Numero,IdPlaca,Kilometraje,Tiempo,Incidencias}){
    let Iamanecida=Incidencias.filter((item) => item.Turno === "NOCHE").length;
    let Imanana=Incidencias.filter((item) => item.Turno === "MAÑANA").length;
    let Itarde=Incidencias.filter((item) => item.Turno === "TARDE").length;
    return <>
        <tr>
            <td className={`p-1 font-bold bg-[#011526] border-t border-white ${Activo?"text-[#F2C230]":"text-white"} text-center`}>{Numero}</td>
            <td className={`p-1 font-bold bg-[#011526] border-t border-white ${Activo?"text-[#F2C230]":"text-white"} text-center`}>{IdPlaca}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Kilometraje}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Tiempo}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Iamanecida}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Imanana}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Itarde}</td>
        </tr>
    </>
}


/*


vercel appp
 */

function sumaa(a,b){
    return a+b;
}
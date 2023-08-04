"use client"
import React, { useState,useEffect,useContext } from "react";
import { Router } from "next/router";
import axios from "axios";
export default function Reporte({params}){
    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);

    if(params&&params.data.length<2) return <>Ocurrio un error</>;

    const fetchData= (params)=>{
      axios.get(`${process.env.API_URL}/sipcop/getday`,{params}).then(({data,status})=>{
        if(status===400) setData(null);
        setData(data);
      }).catch(()=>(null));
    }

    const Config= ()=>{
        axios.get(`${process.env.API_URL}/configuracion`,{}).then(({data,status})=>{
          if(status===400) setConfig(null);
          setConfig(data.msg);
        }).catch(()=>(null));
    }
    useEffect(() => {
        fetchData({fecha:decodeURIComponent(params.data[0]),turno:decodeURIComponent(params.data[1])});
        Config();
        console.log(decodeURIComponent(params.data[0]),params.data[1]);
    },[]);

    return <>
        <div className="flex h-screen items-center justify-center">
            <table className="border-collapse">
                <thead>
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
                    {data&&config&&data.ok&&data.msg.map((res)=>(<TableTr {...res} Config={config} FindTable={data}/>))}
                </tbody>
            </table>
        </div>
    </>;
}

function TableTr({Config,Activo,Numero,IdPlaca,Kilometraje,Tiempo,Incidencias}){
    let km=(Config.SIPkm-Kilometraje);
    let minutos=(Config.SIPminutos-Tiempo);
    if(km<=0) km="CUMPLIO";
    if(minutos<=0) minutos="CUMPLIO";
    let Iamanecida=Incidencias.filter((item) => item.Turno === "NOCHE").length;
    let Imanana=Incidencias.filter((item) => item.Turno === "MAÑANA").length;
    let Itarde=Incidencias.filter((item) => item.Turno === "TARDE").length;
    return <>
        <tr >
            <td className={`p-1 font-bold bg-[#011526] border-t border-white ${Activo?"text-[#F2C230]":"text-white"} text-center`}>{Numero}</td>
            <td className={`p-1 font-bold bg-[#011526] border-t border-white ${Activo?"text-[#F2C230]":"text-white"} text-center`}>{IdPlaca}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{km}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{minutos}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Iamanecida}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Imanana}</td>
            <td className={`p-1 text-center border border-[#011526] ${Activo&&"bg-[#F2C230] font-bold"}`}>{Itarde}</td>
        </tr>
    </>
}
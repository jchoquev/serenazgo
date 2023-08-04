"use client"
import React, { useState,useEffect,useContext } from "react";
import moment from "moment";
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
          console.log(data)
        }).catch(()=>(null));
    }
    useEffect(() => {
        fetchData({fecha:decodeURIComponent(params.data[0]),turno:decodeURIComponent(params.data[1])});
    },[params.data]);

    useEffect(() => {
        Config();
    },[]);

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
                    {data&&config&&data.ok&&data.msg.map((res)=>(<TableTr {...res} Config={config} FindTable={data}/>))}
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={7}>
                            <div className="text-center font-semibold w-[500px] bg-slate-200 p-2 rounded-3xl mt-1">
                                <p>ESTRACTO ACTUALIZADO SEGUN SIPCOP-M TURNO {decodeURIComponent(params.data[1])=="NOCHE"?"AMANECIDA":decodeURIComponent(params.data[1])} SIENDO LAS 
                                 <span className="font-bold p-1  text-lg rounded-lg ml-2 bg-[#8C0707] text-white"> {moment().format("HH:mm A")}</span>.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>;
}

function TableTr({Config,_id,Activo,Numero,IdPlaca,Kilometraje,Tiempo,Incidencias}){
    let km=(Config.SIPkm-Kilometraje);
    let minutos=(Config.SIPminutos-Tiempo);
    if(km<=0) km="CUMPLIO";
    if(minutos<=0) minutos="CUMPLIO";
    let Iamanecida=Incidencias.filter((item) => item.Turno === "NOCHE").length;
    let Imanana=Incidencias.filter((item) => item.Turno === "MAÑANA").length;
    let Itarde=Incidencias.filter((item) => item.Turno === "TARDE").length;
    return <>
        <tr key={_id}>
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
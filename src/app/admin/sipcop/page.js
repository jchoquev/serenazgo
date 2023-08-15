"use client"
import Navbar from "@/components/Navbar";
import Template from "@/components/TemplateAdmin";
import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, TextInput,Checkbox } from 'flowbite-react';
import { TbGps } from 'react-icons/tb';
import { MdDashboard } from 'react-icons/md';
import { RiGpsFill } from 'react-icons/ri';
import {BiSolidEditLocation,BiSolidTimeFive} from "react-icons/bi"
import {BsPersonLinesFill,BsPatchPlusFill} from "react-icons/bs"
import axios from "axios";
export default function Sipcop(){
  return <>
      <Template Dynamic={TabsSipcop}/>
  </>;
}

function TabsSipcop(){
  const [DataTurno, setDataTurno] = useState(null);
  return <>
      <Tabs.Group
          aria-label="Default tabs"
          style="default">
          <Tabs.Item
              active
              icon={TbGps}
              title="SIPCOP-M"
          >
            02
          </Tabs.Item>
          <Tabs.Item
              icon={MdDashboard}
              title="mas.."
          >
            02
          </Tabs.Item>
      </Tabs.Group>
  </>
}

function TableGPSControl(){
    const [data, setData] = useState(null);
    const fetchData= (params)=>{
      axios.get(`${process.env.API_URL}/sipcop/getday`,{params}).then(({data,status})=>{
        if(status===400) setData(null);
        setData(data);
      }).catch(()=>(null));
    }

    useEffect(() => {
      setData(fetchData({fecha:'01/08/2023',turno:"MAÑANA"}));
      console.log("Pruebando")
    },[]);

    return (
        <Table>
          <Table.Head>
            <Table.HeadCell className="p-4"> </Table.HeadCell>
            <Table.HeadCell>
              #
            </Table.HeadCell>
            <Table.HeadCell>
              Acciones
            </Table.HeadCell>
            <Table.HeadCell>
              Placa
            </Table.HeadCell>
            <Table.HeadCell>
              Encargados
            </Table.HeadCell>
            <Table.HeadCell>
              Tactico
            </Table.HeadCell>
            <Table.HeadCell>
              Incidencia
            </Table.HeadCell>
            <Table.HeadCell>
              Zona
            </Table.HeadCell>
            <Table.HeadCell>
              Observación
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
              {data&&data.ok&&data.msg.map((row)=>(<TableRow key={row._id} {...row}/>))}
          </Table.Body>
        </Table>
      )
}

function TableRow(data){
  return (<>
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        <CheckboxActivo/>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {data.Numero}
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
            <Button color="gray" size="sm">
                <RiGpsFill className="w-5 h-5"/>
            </Button>
            <Button color="gray" size="sm">
                <BiSolidEditLocation className="w-5 h-5"/>
            </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>
        {data.IdPlaca}
      </Table.Cell>
      <Table.Cell>
        <Button color="gray" className="w-full" size="sm">
            <BsPersonLinesFill className="w-5 h-5"/>
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button color="gray" className="w-full" size="sm">
            <BiSolidTimeFive className="w-5 h-5"/>
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button color="gray" className="w-full" size="sm">
            <BsPatchPlusFill className="w-5 h-5"/>
        </Button>
      </Table.Cell>
      <Table.Cell>
        {data.Zona}
      </Table.Cell>
      <Table.Cell>
        <TextObservacion {...data}/>
      </Table.Cell>
    </Table.Row>
  </>)
}

function CheckboxActivo({_id,Activo}){
  const [activo, setActivo] = useState({_id,Activo});
  return <Checkbox checked={activo.Activo}/>;
}

function TextObservacion({_id,Observacion}){
  const [obs, setObs] = useState({_id,Observacion});
  const handleChange = (e) => {
    setObs({...obs,Observacion:e.target.value});
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      //llenar
    }
  };
  return <TextInput sizing="sm" type="text"  value={obs.Observacion} onKeyDown={handleKeyDown} onChange={handleChange}/>;
}


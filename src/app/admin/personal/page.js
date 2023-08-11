"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import {FaUsers} from 'react-icons/fa';
import { BiSolidUserDetail } from 'react-icons/bi';
import { Tabs } from "flowbite-react";
import Position from "@/components/Position";
import Staff from "@/components/Staff";
import axios from "axios";
import { useEffect } from "react";
export default function Vehicle(){
    return <>
        <Template Dynamic={TabsVehicle}/>
    </>;
}

function TabsVehicle(){
    const [DataPosition, setDataPosition] = useState(null);
    const [DataGroup, setDataGroup] = useState(null);

    const fetchData=()=>{
        axios.get(`${process.env.API_URL}staff/position`,{}).then(({data:{msg}})=>{
            setDataPosition(msg)
        }).catch(err=>{alert("Ocurrio un error, intentelo de nuevo ...")});
    }
    const fetchDataGrupo=()=>{
        axios.get(`${process.env.API_URL}group/activo`,{}).then(({data:{msg}})=>{
            setDataGroup(msg)
        }).catch(err=>{alert("Ocurrio un error, intentelo de nuevo ...")});
    }

    useEffect(()=>{
        fetchData();
        fetchDataGrupo();
    },[]);

    return <>
        <Tabs.Group
            aria-label="Default tabs"
            style="default">
            <Tabs.Item
                active
                icon={FaUsers}
                title="Personal"
            >
               <Staff DataPosition={DataPosition} DataGroup={DataGroup}/>
            </Tabs.Item>
            <Tabs.Item
                icon={BiSolidUserDetail}
                title="Cargos"
            >
                <Position DataPosition={DataPosition} setDataPosition={setDataPosition} fetchData={fetchData}/>
            </Tabs.Item>
        </Tabs.Group>
    </>
}

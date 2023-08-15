"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import { FaUsers } from 'react-icons/fa';
import { BsListCheck } from 'react-icons/bs';
import { Tabs } from "flowbite-react";
import Shift from "@/components/Shift";
import Group from "@/components/Zones";
export default function Grupo(){
    return <>
        <Template Dynamic={TabsGrupo}/>
    </>;
}

function TabsGrupo(){
    const [DataTurno, setDataTurno] = useState(null);
    return <>
        <Tabs.Group
            aria-label="Default tabs"
            style="default">
            <Tabs.Item
                active
                icon={FaUsers}
                title="Gupo"
            >
                <Group DataTurno={DataTurno}/>
            </Tabs.Item>
            <Tabs.Item
                icon={BsListCheck}
                title="Turno"
            >
                <Shift Data={DataTurno} setData={setDataTurno}/>
            </Tabs.Item>
        </Tabs.Group>
    </>
}

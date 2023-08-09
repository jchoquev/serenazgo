"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import {FaCar} from 'react-icons/fa';
import { BsCardChecklist } from 'react-icons/bs';
import { Tabs } from "flowbite-react";
import TypeVehicles from "@/components/typeVehicles";
export default function Vehicle(){
    return <>
        <Template Dynamic={TabsVehicle}/>
    </>;
}

function TabsVehicle(){
    const [DataTipo, setDataTipo] = useState(null);
    return <>
        <Tabs.Group
            aria-label="Default tabs"
            style="default">
            <Tabs.Item
                active
                icon={FaCar}
                title="Vehiculos"
            >
                01
            </Tabs.Item>
            <Tabs.Item
                icon={BsCardChecklist}
                title="Tipo"
            >
                <TypeVehicles DataTipo={DataTipo} setDataTipo={setDataTipo}/>
            </Tabs.Item>
        </Tabs.Group>
    </>
}

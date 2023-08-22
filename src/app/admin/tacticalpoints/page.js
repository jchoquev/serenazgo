"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import {BiSolidMapPin} from 'react-icons/bi';
import { Tabs } from "flowbite-react";
import TacticalPoints from "@/components/tacticalpoints/dataTable/Table";
export default function TacticalPoint(){
    return <>
        <Template Dynamic={TabsTacticalPoints}/>
    </>;
}

function TabsTacticalPoints(){
    const [DataTipo, setDataTipo] = useState(null);
    return <>
        <Tabs.Group
            aria-label="Default tabs"
            style="default">
            <Tabs.Item
                active
                icon={BiSolidMapPin}
                title="Puntos Tacticos"
            >
                <TacticalPoints/>
            </Tabs.Item>
        </Tabs.Group>
    </>
}

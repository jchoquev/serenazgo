"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import { FaUsers } from 'react-icons/fa';
import { BsListCheck } from 'react-icons/bs';
import {MdPlaylistAddCheck} from 'react-icons/md';
import {FaMapMarkedAlt} from 'react-icons/fa'
import { Tabs } from "flowbite-react";
import Shift from "@/components/Shift";
import Zones from "@/components/Zones";
export default function Configs(){
    return <>
        <Template Dynamic={TabsConfig}/>
    </>;
}

function TabsConfig(){
    const [Data, setData] = useState(null);
    return <>
        <Tabs.Group
            aria-label="Default tabs"
            style="default">
            <Tabs.Item
                active
                icon={FaUsers}
                title="Gupo"
            >
                01
            </Tabs.Item>
            <Tabs.Item
                icon={BsListCheck}
                title="Turno"
            >
                <Shift Data={Data} setData={setData}/>
            </Tabs.Item>
            <Tabs.Item
                icon={FaMapMarkedAlt}
                title="Zonas"
            >
                <Zones/>
            </Tabs.Item>
            <Tabs.Item
                icon={MdPlaylistAddCheck}
                title="Control"
            >
                04
            </Tabs.Item>
        </Tabs.Group>
    </>
}

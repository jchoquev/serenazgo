"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import { FaUsers } from 'react-icons/fa';
import { BsListCheck } from 'react-icons/bs';
import {MdPlaylistAddCheck,MdSpeakerPhone} from 'react-icons/md';
import {FaMapMarkedAlt,FaCarSide} from 'react-icons/fa'
import {ImUserTie} from "react-icons/im"
import { Tabs } from "flowbite-react";
import Shift from "@/components/Shift";
import Zones from "@/components/Zones";
import Group from "@/components/Group";
import Handy from "@/components/Handy";
export default function Configs(){
    return <>
        <Template Dynamic={TabsConfig}/>
    </>;
}

function TabsConfig(){
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
            <Tabs.Item
                icon={FaMapMarkedAlt}
                title="Zonas"
            >
                <Zones/>
            </Tabs.Item>
            <Tabs.Item
                icon={FaCarSide}
                title="Vehiculos"
            >
                04
            </Tabs.Item>
            <Tabs.Item
                icon={MdSpeakerPhone}
                title="Handy's"
            >
                <Handy/>
            </Tabs.Item>
            <Tabs.Item
                icon={ImUserTie}
                title="Cargos"
            >
                06
            </Tabs.Item>
            <Tabs.Item
                icon={MdPlaylistAddCheck}
                title="Control"
            >
                07
            </Tabs.Item>
        </Tabs.Group>
    </>
}

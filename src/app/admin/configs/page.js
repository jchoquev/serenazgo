"use client"
import Template from "@/components/TemplateAdmin";
import { FaUsers } from 'react-icons/fa';
import { BsListCheck } from 'react-icons/bs';
import {MdPlaylistAddCheck} from 'react-icons/md';
import {FaMapMarkedAlt} from 'react-icons/fa'
import { Tabs } from "flowbite-react";
import Shift from "@/components/Shift";
export default function Configs(){
    return <>
        <Template Dynamic={TabsConfig}/>
    </>;
}

function TabsConfig(){
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
                <Shift/>
            </Tabs.Item>
            <Tabs.Item
                icon={FaMapMarkedAlt}
                title="Zonas"
            >
                03
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

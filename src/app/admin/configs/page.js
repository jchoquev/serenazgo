"use client"
import Template from "@/components/TemplateAdmin";
import {MdPlaylistAddCheck,MdSpeakerPhone} from 'react-icons/md';
import {FaMapMarkedAlt,FaCarSide} from 'react-icons/fa'
import { Tabs } from "flowbite-react";
import Zones from "@/components/Zones";
import Handy from "@/components/Handy";
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
                icon={FaMapMarkedAlt}
                title="Zonas"
            >
                <Zones/>
            </Tabs.Item>
            <Tabs.Item
                icon={MdSpeakerPhone}
                title="Handy's"
            >
                <Handy/>
            </Tabs.Item>
            <Tabs.Item icon={MdPlaylistAddCheck} title="Control">
                -
            </Tabs.Item>
        </Tabs.Group>
    </>
}

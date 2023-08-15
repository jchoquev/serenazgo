"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import { ImUserCheck } from 'react-icons/im';
import { BsListCheck } from 'react-icons/bs';
import { Tabs } from "flowbite-react";
export default function Grupo(){
    return <>
        <Template Dynamic={TabsAsistencia}/>
    </>;
}

function TabsAsistencia(){
    return <Tabs.Group
        aria-label="Default tabs"
        style="default">
        <Tabs.Item
            active
            icon={ImUserCheck}
            title="Asistencia"
        >
            01
        </Tabs.Item>
        <Tabs.Item
            icon={BsListCheck}
            title="Turno"
        >
            02
        </Tabs.Item>
    </Tabs.Group>
}
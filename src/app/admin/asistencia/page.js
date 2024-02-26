"use client"
import Template from "@/components/TemplateAdmin";
import { useState } from "react";
import { ImUserCheck } from 'react-icons/im';
import { BsListCheck } from 'react-icons/bs';
import { Tabs } from "flowbite-react";
import Asistencia from "@/components/asistencia/table";
import { useSession } from "next-auth/react";
export default function AsistenciaGen(){
    return <>
        <Template Dynamic={TabsAsistencia}/>
    </>;
}

function TabsAsistencia(){
    const { data: session,status }=useSession();
    return <Tabs.Group
        aria-label="Default tabs"
        style="default">
        <Tabs.Item
            active
            icon={ImUserCheck}
            title="Asistencia"
        >
            <Asistencia session={session} status={status}/>
        </Tabs.Item>
        <Tabs.Item
            icon={BsListCheck}
            title="Turno"
        >
            02
        </Tabs.Item>
    </Tabs.Group>
}
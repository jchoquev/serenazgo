"use client"
import Template from "@/components/TemplateAdmin";
import {BsPersonFillLock} from 'react-icons/bs';
import { BiSolidLock } from 'react-icons/bi';
import { Tabs } from "flowbite-react";
import ComponentRole from "@/components/Role/Roles/ComponentRole";
export default function Roles(){
    return <>
        <Template Dynamic={TabsVehicle}/>
    </>;
}

function TabsVehicle(){
    return <>
        <Tabs.Group
            aria-label="Default tabs"
            style="default">
            <Tabs.Item
                active
                icon={BsPersonFillLock}
                title="Roles"
            >
               <ComponentRole/>
            </Tabs.Item>
            <Tabs.Item
                icon={BiSolidLock}
                title="Acceso"
            >
                
            </Tabs.Item>
        </Tabs.Group>
    </>
}

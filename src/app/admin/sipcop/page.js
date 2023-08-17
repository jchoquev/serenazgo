"use client"
import Navbar from "@/components/Navbar";
import Template from "@/components/TemplateAdmin";
import React, { useState, useEffect } from 'react';
import { Tabs } from 'flowbite-react';
import { TbGps } from 'react-icons/tb';
import { MdDashboard } from 'react-icons/md';
import SipcopTable from "@/components/SipCop/dataTable/Table";
import { useSession } from "next-auth/react";
export default function Sipcop(){
  //console.log(session&&session.user)
  return <>
      <Template Dynamic={TabsSipcop}/>
  </>;
}

function TabsSipcop(){
  const { data: session,status }=useSession();
  const [DataTurno, setDataTurno] = useState(null);
  return <>
      <Tabs.Group
      aria-label="Default tabs"
      style="default">
          <Tabs.Item
              active
              icon={TbGps}
              title="SIPCOP-M"
          >
            <SipcopTable User={session&&session.user}/>
          </Tabs.Item>
      </Tabs.Group>
  </>
}

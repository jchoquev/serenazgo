"use client"
import { useState,useEffect } from "react";
import StaffDataTable from "./dataTable/StaffDataTable";
export default function Staff({DataPosition,DataGroup}) {
    return <>
        <div className="relative w-full">
            <StaffDataTable DataPosition={DataPosition} DataGroup={DataGroup}/>
        </div>
    </>
}

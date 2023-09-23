import { useState,useEffect } from "react";
import axios from "axios";
import {Button, Label, TextInput,Table,Modal,Alert,Pagination,Checkbox,ToggleSwitch,Textarea } from "flowbite-react";
import {MdPlaylistAddCircle,MdEditSquare,MdDelete} from 'react-icons/md'
import { BsDatabaseLock } from 'react-icons/bs';
import { useSelector,useDispatch } from "react-redux";
import { updModalRole, fetchListRole,updRoleList,fetchDeleteRole } from "@/Redux/Slice/roleSlice";
import RoleModal from "./modal/role";
export default function ComponentRole() {
    const dispatch = useDispatch()
    return <>
        <div className="relative w-full">
            <button className="absolute top-0 right-0 z-10 pr-1 pt-1" 
                onClick={()=>{
                    dispatch(updModalRole({key:'open',value:true}));
                    dispatch(updModalRole({key:'form',value:null}));
                    dispatch(updModalRole({key:'update',value:false}));
                }}
            >
                <MdPlaylistAddCircle className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
            </button>
        </div>
        <RoleTable/>
        <RoleModal/>
    </>
}

function RoleTable(){    
    const {List:{data,page,totalPages}}= useSelector((state) => state.Role)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchListRole(page))
    },[page])

    return <div className="overflow-x-auto">
        <Table className="table-auto">
            <Table.Head>
                <Table.HeadCell>
                    Rol
                </Table.HeadCell>
                <Table.HeadCell>
                    Accesos
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {data&&data.map((item)=><TableRow key={item._id} {...item}/>)}
            </Table.Body>
        </Table>
        {<div className="flex items-center justify-center text-center">
            <Pagination
                currentPage={page}
                layout="pagination"
                nextLabel="Anterior"
                previousLabel="Siguiente"
                showIcons
                onPageChange={page=>{dispatch(updRoleList({key:'page',value:page}))}}
                totalPages={totalPages}
                />
        </div>}
    </div>
}

function TableRow(props){
    const {List:{data}}= useSelector((state) => state.Role)
    const dispatch = useDispatch()
    const {_id,Value,Access}=props
    const handleDelete=(_id)=>{
        if(window.confirm("¿Estás seguro de que deseas eliminar?")){
            dispatch(fetchDeleteRole(_id,data))
        }
    }
    const handleCheck=(Activo,_id)=>{
        axios.put(`${process.env.API_URL}handy/activo`, {_id,Activo}).then(_=> {
            fetchData(Pages.page);
        }).catch(_ => {alert("Intentelo mas tarde...")});
    }
    
    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Value}
        </Table.Cell>
        <Table.Cell>
            <Button color="gray" onClick={()=>{}} >
                <BsDatabaseLock/>
            </Button>
        </Table.Cell>
        <Table.Cell className="w-10">
            <Button.Group>
                <Button color="gray" onClick={()=>{
                    dispatch(updModalRole({key:'open',value:true}));
                    dispatch(updModalRole({key:'update',value:true}));
                    dispatch(updModalRole({key:'form',value:props}));
                }} >
                    <MdEditSquare/>
                </Button>
                <Button color="gray" onClick={()=>{handleDelete(_id)}}>
                    <MdDelete className="text-red-700"/>
                </Button>
            </Button.Group>
        </Table.Cell>
    </Table.Row>
}
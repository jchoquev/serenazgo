import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,Table,Checkbox,Label,TextInput,Badge} from "flowbite-react";
import { MdEditSquare } from 'react-icons/md';

import { useSelector,useDispatch } from "react-redux";
import { udpModalListEncargado,udpModalEncargado } from "@/Redux/Slice/modalSlice";

function ListEncargadoModal({listStaff,setListStaff,setEncargadoModal}){
    const {ListEncargados:{List,open}}= useSelector((state) => state.Modal)
    const dispatch=useDispatch()
    /*const {_id,Numero,IdPlaca}=lisTactico.values
    const {datas,setData}=dataTable
    const handleCheck=(Activo,_id,_idSipcop)=>{
        axios.put(`${process.env.API_URL}sipcop/tacticalpoints/activo`, {_id,Activo,_idSipcop}).then(({data})=> {
            const {ok,msg}=data;
            setlisTactico({...lisTactico,List:msg.Tactico});
            setData(datas.map((item)=>{
                if(item._id===msg._id) return msg;
                return item;
            }))
        }).catch(_ => {alert("Intentelo mas tarde...")});
    }*/
    const handleCheck=()=>{
        
    }
    return <>
        <Modal show={open} size="3xl" popup onClose={() =>{dispatch(udpModalListEncargado({key:'open',value:false}))}}>
            <Modal.Header />
            <Modal.Body>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            DNI
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Nombres
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Rol
                        </Table.HeadCell>
                        <Table.HeadCell>
                            # Celular
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {List&&List.map((item)=>(<Table.Row key={item._id} className={`bg-white ${item.Conductor&&"font-bold"} dark:border-gray-700 dark:bg-gray-800`}>
                            <Table.Cell>
                                <Button color="gray"  onClick={()=>{
                                    dispatch(udpModalListEncargado({key:'open',value:false}))
                                    dispatch(udpModalEncargado({key:"open",value:true}))
                                    dispatch(udpModalEncargado({key:"form",value:item}))
                                    dispatch(udpModalEncargado({key:"update",value:true}))
                                }}>
                                <MdEditSquare/>
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                {item.DNI}
                            </Table.Cell>
                            <Table.Cell>
                                <p>{item.Nombres}</p>
                            </Table.Cell>
                            <Table.Cell>
                                {item.Rol.label}
                            </Table.Cell>
                            <Table.Cell>
                                {item.NCelular}
                            </Table.Cell>
                        </Table.Row>))}
                    </Table.Body>
                </Table>
            </Modal.Body>
      </Modal>
    </>
}

export default ListEncargadoModal;

/**/
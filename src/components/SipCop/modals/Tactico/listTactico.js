import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,Table,Checkbox,Label,TextInput,Badge} from "flowbite-react";
import { MdEditSquare } from 'react-icons/md';

import { useSelector,useDispatch } from "react-redux";
import { udpModalListTactico,udpModalTactico,fetchUpdTacticoCompleto } from "@/Redux/Slice/modalSlice";

export default function ListTacticoModal(){
    const {ListTactico:{List,open,sipcop}}= useSelector((state) => state.Modal)
    const dispatch=useDispatch()
    const handleCheck=(Completo,_id)=>{
        dispatch(fetchUpdTacticoCompleto({_id,Completo},List))
    }
    return <>
        <Modal show={open} size="3xl" popup onClose={() => dispatch(udpModalListTactico({key:"open",value:false}))}>
            <Modal.Header>
                <h3 className="font-bold uppercase text-green-900 ml-4">Lista Tacticos ({sipcop&&sipcop.Numero})</h3>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                        <Table.HeadCell className="p-4">
                            COMP.
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Dirección
                        </Table.HeadCell>
                        <Table.HeadCell>
                            H. Llegada
                        </Table.HeadCell>
                        <Table.HeadCell>
                            H. Se Ira
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Obsevaciones
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {List&&List.map((item,index)=>(<Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <Button color="gray"  onClick={()=>{
                                    dispatch(udpModalTactico({key:"form",value:{...item,Numero:sipcop&&sipcop.Numero}}))
                                    dispatch(udpModalTactico({key:"open",value:true}))
                                    dispatch(udpModalTactico({key:"update",value:true}))
                                    dispatch(udpModalListTactico({key:"open",value:false}))
                                }}>
                                    <MdEditSquare/>
                                </Button>
                            </Table.Cell>
                            <Table.HeadCell className="p-4">
                                <Checkbox checked={item.Completo} onChange={()=>handleCheck(!item.Completo,item._id)} />
                            </Table.HeadCell>
                            <Table.Cell>
                                <p> <b>({index+1}) </b> {item.Direccion}</p>
                            </Table.Cell>
                            <Table.Cell>
                                {item.HLlegada}
                            </Table.Cell>
                            <Table.Cell>
                                {item.HSeira}
                            </Table.Cell>
                            <Table.Cell>
                                {item.Observaciones}
                            </Table.Cell>
                        </Table.Row>))}
                    </Table.Body>
                </Table>
            </Modal.Body>
      </Modal>
    </>
}
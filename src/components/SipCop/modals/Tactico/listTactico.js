import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,Table,Checkbox,Label,TextInput,Badge} from "flowbite-react";
import { MdEditSquare } from 'react-icons/md';

export default function ListTacticoModal({lisTactico,setlisTactico,setTactico,dataTable}){
    const {_id,Numero,IdPlaca}=lisTactico.values
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
    }
    return <>
        <Modal show={lisTactico.open} size="3xl" popup onClose={() => setlisTactico({...lisTactico,open:false})}>
            <Modal.Header />
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
                        {lisTactico.List&&lisTactico.List.map((item,index)=>(<Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <Button color="gray"  onClick={()=>{
                                    setlisTactico({...lisTactico,open:false});
                                    setTactico({open:true,update:true,form:{...item,Numero,idTactico:_id,IdPlaca}});
                                }}>
                                    <MdEditSquare/>
                                </Button>
                            </Table.Cell>
                            <Table.HeadCell className="p-4">
                                <Checkbox checked={item.Completo} onChange={()=>handleCheck(!item.Completo,item._id,_id)} />
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
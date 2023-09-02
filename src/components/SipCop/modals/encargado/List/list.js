import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,Table,Checkbox,Label,TextInput,Badge} from "flowbite-react";
import { MdEditSquare } from 'react-icons/md';

function ListEncargadoModal({listStaff,setListStaff,setEncargadoModal}){
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
        <Modal show={listStaff.open} size="3xl" popup onClose={() => setListStaff({...listStaff,open:false})}>
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
                            Cargo
                        </Table.HeadCell>
                        <Table.HeadCell>
                            # Celular
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {listStaff.List&&listStaff.List.map((item)=>(<Table.Row key={item._id} className={`bg-white ${item.Conductor&&"font-bold"} dark:border-gray-700 dark:bg-gray-800`}>
                            <Table.Cell>
                                <Button color="gray"  onClick={()=>{
                                    setListStaff({open:false});
                                    setEncargadoModal({open:true,update:true,form:{...item,_idList:item._id,_id:listStaff.value._id,Select2:{value:item.Cargo,label:item.Cargo}}});
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
                                {item.Cargo}
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
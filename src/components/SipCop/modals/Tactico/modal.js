import { useState,useEffect } from "react";
import {Button,Modal,Table,Checkbox} from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { updModalSipCop,fetchVhActivo,insListSipCop} from "@/Redux/Slice/modalSlice";


export default function SipcopModal({User}){
    const {listSipCop:{data,open}}= useSelector((state) => state.Modal)
    const List= useSelector((state) => state.SipCop.ListSipCops)
    const dispatch = useDispatch()

    const handleCheck=(index,Activo)=>dispatch(updModalSipCop({key:'data',value:data.map((item,i)=>{
                if (index===i) return {...item,Activo:Activo}
                return item;
            })
        }))
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const add=data.filter((item)=>(item.Activo===true));
        dispatch(insListSipCop(add,User&&User.Grupo.Turno,List))
    }
    return <>
        <Modal show={open} size="md" popup onClose={() => dispatch(updModalSipCop({key:'open',value:false}))}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className="p-4">
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    #
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Placa
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Tipo
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data&&data.map((item,index)=>{ return <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="p-4">
                                        <Checkbox checked={item.Activo} onChange={()=>{handleCheck(index,!item.Activo)}}/>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.Numero}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.Placa}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item.Tipo.Tipo}
                                    </Table.Cell>
                                </Table.Row>})}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{"COMPLETAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}
import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,Table,Checkbox} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import Select from 'react-select'

export default function SipcopModal({openModal,fetchData,setOpenModal,DataGroup,User}){
    const [err, setErr] = useState({err:false,msg:""});
    const [data,setData]=useState(null); 
    const fetchvhactivo= ()=>{
        axios.get(`${process.env.API_URL}vehiculos/activo`,{}).then(({data,status})=>{
            if(status===400) setData(null);
            setData(data.msg);
        }).catch((e)=>{
            setErr({err:false,msg:"Ocurrio un error en listar..."})
        });
    }

    useEffect(()=>{
        fetchvhactivo();
    },[])

    const handleCheck=(index,Activo)=>{
        data[index].Activo=Activo
        setData(data.map((item,i)=>{
            if (index===i) return {...item,Activo:Activo}
            return item;
        }))
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData=data.filter((item)=>(item.Activo===true));
        if(formData.length>0){
            axios.post(`${process.env.API_URL}sipcop/inserts/complete`, {add:formData,turno:User&&User.Grupo.Turno}).then(data=> {
                console.log(data)
                setOpenModal({...openModal,open:false});
                //fetchData();
                //alert("actualizado")
            }).catch((e) => { 
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            alert("No tiene nada que actualizar...")
        }
    }
    return <>
        <Modal show={openModal.open} size="md" popup onClose={() => setOpenModal({...openModal,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
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
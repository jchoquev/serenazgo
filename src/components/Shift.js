import { useState,useEffect } from "react";
import axios from "axios";
import {Button, Label, TextInput,Table,Modal,Alert } from "flowbite-react";
import {MdPlaylistAddCircle,MdEditSquare,MdDelete} from 'react-icons/md'
import { HiInformationCircle } from 'react-icons/hi';
export default function Shift({Data, setData}) {
    const [openModal, setOpenModal] = useState({open:false,update:false,form:null});
    const fetchData=()=>{
        axios.get(`${process.env.API_URL}turno`,{}).then(({data:{msg}})=>{
            setData(msg)
        }).catch(err=>{alert("Ocirrio un error, intentelo de nuevo ...")});
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return <>
        <div className="relative w-full">
            <button className="absolute top-0 right-0 z-10 pr-1 pt-1" onClick={()=>{setOpenModal({open:true,update:false,form:{Turno:"",HEntrada:"",HSalida:""}})}}>
                <MdPlaylistAddCircle className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
            </button>
            
            <ShiftTable className="z-0" Data={Data} fetchData={fetchData} setOpenModal={setOpenModal}/>
        </div>
        {openModal.open&&<ShiftModal openModal={openModal} fetchData={fetchData} setOpenModal={setOpenModal}/>}
    </>
}

function ShiftTable({Data,setOpenModal,fetchData}){    
    return <div className="overflow-x-auto">
        <Table className="table-auto">
            <Table.Head>
                <Table.HeadCell>
                Turno
                </Table.HeadCell>
                <Table.HeadCell>
                Hora Entrada
                </Table.HeadCell>
                <Table.HeadCell>
                Hora Salida
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {Data&&Data.map((arr)=>(<TableRow fetchData={fetchData} key={arr._id} {...arr} setOpenModal={setOpenModal}/>))}
            </Table.Body>
        </Table>
    </div>
}

function TableRow({_id,Turno,HEntrada,HSalida,setOpenModal,fetchData}){
    const handleDelete=(_id)=>{
        if(window.confirm("¿Estás seguro de que deseas eliminar?")){
            axios.delete(`${process.env.API_URL}turno`,{data:{_id}}).then(_=>{
                fetchData();
            }).catch(err=>{alert("Intentelo mas tarde..."); console.log(err)});
        }
    }
    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Turno}
        </Table.Cell>
        <Table.Cell>
            {HEntrada}
        </Table.Cell>
        <Table.Cell>
            {HSalida}
        </Table.Cell>
        <Table.Cell className="w-10">
            <Button.Group>
                <Button color="gray" onClick={()=>{setOpenModal({open:true,update:true,form:{Turno,HEntrada,HSalida,_id}})}} >
                    <MdEditSquare/>
                </Button>
                <Button color="gray" onClick={()=>{handleDelete(_id)}}>
                    <MdDelete className="text-red-700"/>
                </Button>
            </Button.Group>
        </Table.Cell>
    </Table.Row>
}

function ShiftModal({openModal,fetchData,setOpenModal}){
    const [err, setErr] = useState({err:false,msg:""});
    let form=openModal.form;
    const handleChange=(e)=>{
        setOpenModal({...openModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const fetchUpdate=(data)=>{
        if(!openModal.update){
            axios.post(`${process.env.API_URL}turno`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData();
            }).catch(_ => { 
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            axios.put(`${process.env.API_URL}turno`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData();
            }).catch(_ => {
                setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
            });
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        fetchUpdate(form);
    }
    return <>
        <Modal show={openModal.open} size="md" popup onClose={() => setOpenModal({...openModal,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Turno" />
                        </div>
                        <TextInput sizing="sm" name="Turno" value={form.Turno} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Hora entrada" />
                        </div>
                        <TextInput type='time' name="HEntrada" value={form.HEntrada} onChange={handleChange} sizing="sm" required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Hora salida" />
                        </div>
                        <TextInput type='time' name="HSalida" value={form.HSalida} onChange={handleChange} sizing="sm" required/>
                    </div>
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{!openModal.update?"GUARDAR":"ACTUALIZAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}
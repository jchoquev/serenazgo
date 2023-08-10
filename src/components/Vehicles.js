import { useState,useEffect } from "react";
import axios from "axios";
import {Button, Label, TextInput,Table,Modal,Alert,Checkbox,ToggleSwitch } from "flowbite-react";
import {MdPlaylistAddCircle,MdEditSquare,MdDelete} from 'react-icons/md'
import { HiInformationCircle } from 'react-icons/hi';
import moment from "moment-timezone";
import Select from 'react-select'
const form={
    Numero:"",
    Placa:"",
    Tipo:{},
    Activo:true,
    Select2:{}
}
export default function Vehicles({DataTipo}) {
    const [openModal, setOpenModal] = useState({open:false,update:false,form:form});
    const [Data, setData] = useState(null);

    const fetchData=()=>{
        axios.get(`${process.env.API_URL}vehiculos`,{}).then(({data:{msg}})=>{
            setData(msg)
        }).catch(err=>{alert("Ocurrio un error, intentelo de nuevo ...")});
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return <>
        <div className="relative w-full">
            <button className="absolute top-0 right-0 z-10 pr-1 pt-1" onClick={()=>{setOpenModal({open:true,update:false,form:form})}}>
                <MdPlaylistAddCircle className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
            </button>
            <ShiftTable className="z-0" Data={Data} fetchData={fetchData}  setOpenModal={setOpenModal}/>
        </div>
        {openModal.open&&<VehiclesModal openModal={openModal} fetchData={fetchData} options={DataTipo} setOpenModal={setOpenModal}/>}
    </>
}

function ShiftTable({Data,setOpenModal,fetchData}){    
    return <div className="overflow-x-auto">
        <Table className="table-auto">
            <Table.Head>
                <Table.HeadCell>
                    <span className="sr-only">
                        Activo
                    </span>
                </Table.HeadCell>
                <Table.HeadCell>
                    #
                </Table.HeadCell>
                <Table.HeadCell>
                    PLACA
                </Table.HeadCell>
                <Table.HeadCell>
                    Tipo
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

function TableRow({_id,Numero,Placa,Tipo,Activo,setOpenModal,fetchData}){
    const handleDelete=(_id)=>{
        if(window.confirm("¿Estás seguro de que deseas eliminar?")){
            axios.delete(`${process.env.API_URL}vehiculos`,{data:{_id}}).then(_=>{
                fetchData();
            }).catch(err=>{alert("Intentelo mas tarde...");});
        }
    }
    const handleCheck=(Activo,_id)=>{
        axios.put(`${process.env.API_URL}vehiculos/activo`, {_id,Activo}).then(_=> {
            fetchData();
        }).catch(_ => {alert("Intentelo mas tarde...")});
    }
    
    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4 w-10">
            <Checkbox checked={Activo} onChange={(e)=>handleCheck(!Activo,_id)}/>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Numero}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Placa}
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Tipo.Tipo}
        </Table.Cell>
        <Table.Cell className="w-10">
            <Button.Group>
                <Button color="gray" onClick={()=>{setOpenModal({open:true,update:true,
                    form:{
                        _id,
                        Numero,
                        Placa,
                        Activo,
                        Tipo:Tipo,
                        Select2:{value:Tipo._id,label:Tipo.Tipo,Prioridad:Tipo.Prioridad}
                    }
                    })}} >
                    <MdEditSquare/>
                </Button>
                <Button color="gray" onClick={()=>{handleDelete(_id)}}>
                    <MdDelete className="text-red-700"/>
                </Button>
            </Button.Group>
        </Table.Cell>
    </Table.Row>
}

function VehiclesModal({openModal,fetchData,setOpenModal,options}){
    const [err, setErr] = useState({err:false,msg:""});
    let form=openModal.form;

    const handleChange=(e)=>{
        setOpenModal({...openModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleSelect=({value,label,Prioridad})=>{
        const Tipo={_id:value,Tipo:label,Prioridad};
        setOpenModal({...openModal,form:{...form,Tipo,Select2:{value,label,Prioridad}}})
    }

    const handleCheck=(Activo)=>{
        setOpenModal({...openModal,form:{...form,Activo:Activo}})
    }

    const fetchUpdate=(data)=>{
        if(!openModal.update){
            axios.post(`${process.env.API_URL}vehiculos`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData();
            }).catch(_ => { 
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            axios.put(`${process.env.API_URL}vehiculos`, data).then(_=> {
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
                            <Label value="Numero" />
                        </div>
                        <TextInput sizing="sm" type="number" name="Numero" value={form.Numero} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Placa" />
                        </div>
                        <TextInput sizing="sm" name="Placa" value={form.Placa} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Tipo" />
                        </div>
                        {options&&<Select onChange={handleSelect} value={form.Select2} options={options.map((option)=>({ value: option._id, label:option.Tipo,Prioridad:option.Prioridad}))} required/>}
                    </div>
                    <div>
                        <ToggleSwitch
                            className="mt-2"
                            checked={form.Activo}
                            label="Activo"
                            onChange={()=>{handleCheck(!form.Activo)}}
                        />
                    </div>
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{!openModal.update?"GUARDAR":"ACTUALIZAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}
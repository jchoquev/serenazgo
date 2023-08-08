import { useState,useEffect } from "react";
import axios from "axios";
import {Button, Label, TextInput,Table,Modal,Alert,Select,Checkbox,ToggleSwitch } from "flowbite-react";
import {MdPlaylistAddCircle,MdEditSquare,MdDelete} from 'react-icons/md'
import { HiInformationCircle } from 'react-icons/hi';
import moment from "moment-timezone";
const form={
    Grupo:"",
    Turno:"",
    Desde:"",
    Hasta:"",
    Activo:true,
}
export default function Group({DataTurno}) {
    const [openModal, setOpenModal] = useState({open:false,update:false,form:form});
    const [Data, setData] = useState(null);

    const fetchData=()=>{
        axios.get(`${process.env.API_URL}group`,{}).then(({data:{msg}})=>{
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
            <ShiftTable className="z-0" Data={Data} fetchData={fetchData} setOpenModal={setOpenModal}/>
        </div>
        {openModal.open&&<ZoneModal openModal={openModal} fetchData={fetchData} DataTurno={DataTurno} setOpenModal={setOpenModal}/>}
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
                    Grupo
                </Table.HeadCell>
                <Table.HeadCell>
                    Turno
                </Table.HeadCell>
                <Table.HeadCell>
                    Desde
                </Table.HeadCell>
                <Table.HeadCell>
                    Hasta
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

function TableRow({_id,Activo,Grupo,Turno,Desde,Hasta,setOpenModal,fetchData}){
    const handleDelete=(_id)=>{
        if(window.confirm("¿Estás seguro de que deseas eliminar?")){
            axios.delete(`${process.env.API_URL}group`,{data:{_id}}).then(_=>{
                fetchData();
            }).catch(err=>{alert("Intentelo mas tarde...");});
        }
    }
    const handleCheck=(Activo,_id)=>{
        axios.put(`${process.env.API_URL}group/activo`, {_id,Activo}).then(_=> {
            fetchData();
        }).catch(_ => {alert("Intentelo mas tarde...")});
    }
    
    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4">
            <Checkbox checked={Activo} onChange={(e)=>handleCheck(!Activo,_id)}/>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Grupo}
        </Table.Cell>
        <Table.Cell>
            {Turno.Turno}
        </Table.Cell>
        <Table.Cell>
            {moment.tz(Desde, "UTC").format("DD/MM/YYYY")}
        </Table.Cell>
        <Table.Cell>
            {moment.tz(Hasta, "UTC").format("DD/MM/YYYY")}
        </Table.Cell>
        <Table.Cell className="w-10">
            <Button.Group>
                <Button color="gray" onClick={()=>{setOpenModal({open:true,update:true,
                    form:{
                        Grupo,
                        Turno,
                        Desde:moment.tz(Desde, "UTC").format("YYYY-MM-DD"),
                        Hasta:moment.tz(Hasta, "UTC").format("YYYY-MM-DD"),
                        Activo,
                        _id
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

function ZoneModal({openModal,fetchData,setOpenModal,DataTurno}){
    const [err, setErr] = useState({err:false,msg:""});
    let form=openModal.form;
    const handleChange=(e)=>{
        setOpenModal({...openModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleSelect=(e)=>{
        const option= DataTurno.filter((item)=>(item._id===e.target.value));
        if(option.length>0){
            setOpenModal({...openModal,form:{...form,Turno:option[0]}})
        }
    }

    const handleCheck=(Activo)=>{
        setOpenModal({...openModal,form:{...form,Activo:Activo}})
    }
    const fetchUpdate=(data)=>{
        if(!openModal.update){
            axios.post(`${process.env.API_URL}group`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData();
            }).catch(_ => { 
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            axios.put(`${process.env.API_URL}group`, data).then(_=> {
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
                            <Label value="Grupo" />
                        </div>
                        <TextInput sizing="sm" name="Grupo" value={form.Grupo} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Turno" />
                        </div>
                        <Select name="Turno" sizing="sm" onChange={handleSelect} required>
                            <option></option>
                            {DataTurno&&DataTurno.map((option)=>(<option key={option._id} value={option._id} selected={option.Turno===form.Turno.Turno}>{option.Turno}</option>))}
                        </Select>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Desde" />
                        </div>
                        <TextInput sizing="sm" name="Desde" type="date" value={form.Desde} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Hasta" />
                        </div>
                        <TextInput sizing="sm" name="Hasta" type="date" value={form.Hasta} onChange={handleChange} required/>
                    </div>
                    <div>
                        <ToggleSwitch
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
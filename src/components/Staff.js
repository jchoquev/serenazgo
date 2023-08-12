"use client"
import { useState,useEffect } from "react";
import axios from "axios";
import {Button, Label, TextInput,Table,Modal,Alert,Pagination,Checkbox,ToggleSwitch,Textarea } from "flowbite-react";
import {MdPlaylistAddCircle,MdEditSquare,MdDelete} from 'react-icons/md'
import { HiInformationCircle } from 'react-icons/hi';
import Select from 'react-select'
const form={
    NDocumento:"",
    Password:'',
    Nombres:'',
    ApePaterno:'',
    ApeMaterno:'',
    NCelular:'',
    Activo:true,
    Cargo:{},
    Grupo:{}
}
export default function Staff({DataPosition,DataGroup}) {
    const [openModal, setOpenModal] = useState({open:false,update:false,form:form});
    const [Data, setData] = useState(null);
    const [page,setPage]=useState({pages:2,page:1,data:[]});

    const fetchData=(pageItem)=>{
        axios.get(`${process.env.API_URL}handy/page/${pageItem||1}`).then(({data:{msg}})=>{
            setData(msg)
        }).catch(_=>{Alert("Ocurrio un error, intentelo de nuevo...")});
    }

    const fetchPage=()=>{
        axios.get(`${process.env.API_URL}handy/page`).then(({data:{msg}})=>{
            setPage({...page,pages:msg})
        }).catch(_=>{Alert("Ocurrio un error, intentelo de nuevo...")});
    }

    useEffect(()=>{
        fetchData();
    },[]);

    useEffect(()=>{fetchPage()},[Data]);

    return <>
        <div className="relative w-full">
            <button className="absolute top-0 right-0 z-10 pr-1 pt-1" onClick={()=>{setOpenModal({open:true,update:false,form:form})}}>
                <MdPlaylistAddCircle className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
            </button>
            <HandyTable className="z-0" Pages={page} Data={Data} setPage={setPage} fetchData={fetchData} setOpenModal={setOpenModal}/>
        </div>
        {openModal.open&&<HandyModal Page={page}  openModal={openModal} fetchData={fetchData} DataGroup={DataGroup} DataPosition={DataPosition} setOpenModal={setOpenModal}/>}
    </>
}

function HandyTable({Data,setOpenModal,fetchData,Pages,setPage}){    
    const handlePage=(page)=>{
        setPage({...Pages,page:page});
        fetchData(page)
    }
    return <div className="overflow-x-auto">
        <Table className="table-auto">
            <Table.Head>
                <Table.HeadCell>
                    <span className="sr-only">
                        Activo
                    </span>
                </Table.HeadCell>
                <Table.HeadCell>
                    Numero
                </Table.HeadCell>
                <Table.HeadCell>
                    Onservación
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {Data&&Data.map((arr)=>(<TableRow Pages={Pages} fetchData={fetchData} key={arr._id} {...arr} setOpenModal={setOpenModal}/>))}
            </Table.Body>
        </Table>
        {Pages&&<div className="flex items-center justify-center text-center">
            <Pagination
                currentPage={Pages.page}
                layout="pagination"
                nextLabel="Anterior"
                previousLabel="Siguiente"
                showIcons
                onPageChange={page=>{handlePage(page)}}
                totalPages={Pages.pages}
            />
        </div>}
    </div>
}

function TableRow({_id,Activo,Numero,Observacion,setOpenModal,fetchData,Pages}){
    const handleDelete=(_id)=>{
        if(window.confirm("¿Estás seguro de que deseas eliminar?")){
            axios.delete(`${process.env.API_URL}handy`,{data:{_id}}).then(_=>{
                fetchData();
            }).catch(err=>{alert("Intentelo mas tarde...");});
        }
    }
    const handleCheck=(Activo,_id)=>{
        axios.put(`${process.env.API_URL}handy/activo`, {_id,Activo}).then(_=> {
            fetchData(Pages.page);
        }).catch(_ => {alert("Intentelo mas tarde...")});
    }
    
    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4">
            <Checkbox checked={Activo} onChange={(e)=>handleCheck(!Activo,_id)}/>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Numero}
        </Table.Cell>
        <Table.Cell>
            {Observacion}
        </Table.Cell>
        <Table.Cell className="w-10">
            <Button.Group>
                <Button color="gray" onClick={()=>{setOpenModal({open:true,update:true,
                    form:{
                        Numero,
                        Observacion,
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

function HandyModal({openModal,fetchData,setOpenModal,Page,DataGroup,DataPosition}){
    const [err, setErr] = useState({err:false,msg:""});
    let form=openModal.form;
    const handleChange=(e)=>{
        setOpenModal({...openModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleCheck=(Activo)=>{
        setOpenModal({...openModal,form:{...form,Activo:Activo}})
    }
    const handleSelect=(name,value)=>{
        setOpenModal({...openModal,form:{...form,[name]:value}})
    }
    const fetchUpdate=(data)=>{
        if(!openModal.update){
            axios.post(`${process.env.API_URL}staff`, data).then(_=> {
                //setOpenModal({...openModal,open:false});
                //fetchData(Page.page);
                alert("Insertado")
            }).catch((e) => { 
                console.error(e)
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            axios.put(`${process.env.API_URL}handy`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData(Page.page);
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
                            <Label value="# de documento" />
                        </div>
                        <TextInput sizing="sm" name="NDocumento" minlength="8" value={form.NDocumento} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Nombres" />
                        </div>
                        <TextInput sizing="sm" name="Nombres" value={form.Nombres} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Apellido Paterno" />
                        </div>
                        <TextInput sizing="sm" name="ApePaterno" value={form.ApePaterno} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Apellido Materno" />
                        </div>
                        <TextInput sizing="sm" name="ApeMaterno" value={form.ApeMaterno} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="# de celular" />
                        </div>
                        <TextInput sizing="sm" name="NCelular" minlength="5" value={form.NCelular} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Cargo" />
                        </div>
                        {DataPosition&&<Select onChange={(select)=>{handleSelect('Cargo',select)}} value={form.Cargo} options={DataPosition.map((option)=>({...option, value: option._id, label:option.Cargo}))} required/>}
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Grupo" />
                        </div>
                        {DataGroup&&<Select onChange={(select)=>{handleSelect('Grupo',select)}} value={form.Grupo} options={DataGroup.map((option)=>({ ...option,value: option._id, label:option.Grupo}))} required/>}
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
import { useState,useEffect } from "react";
import axios from "axios";
import {Button, Label, TextInput,Table,Modal,Alert,Pagination,Checkbox,ToggleSwitch,Textarea } from "flowbite-react";
import {MdPlaylistAddCircle,MdEditSquare,MdDelete} from 'react-icons/md'
import TacticalModal from "../modals/ModalTactical";

export default function TacticalPoints() {
    const [openModal, setOpenModal] = useState({open:false,update:false});
    const [page,setPage]=useState({pages:0,page:1,data:[]});

    const fetchData=()=>{
        axios.get(`${process.env.API_URL}tactical/page/${page.page||1}`).then(({data})=>{
            const {ok,msg,totalPages}=data
            if(ok){
                setPage({...page,pages:totalPages,data:msg})
            }
        }).catch(_=>{
            Alert("Ocurrio un error, intentelo de nuevo...")
        });
    }

    useEffect(()=>{
        fetchData();
    },[page.page]);

    return <>
        <div className="relative w-full">
            <button className="absolute top-0 right-0 z-10 pr-1 pt-1" onClick={()=>{setOpenModal({open:true,update:false,form:{Activo:true}})}}>
                <MdPlaylistAddCircle className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
            </button>
            <TacticalTable className="z-0" Pages={page} setPage={setPage} fetchData={fetchData} setOpenModal={setOpenModal}/>
        </div>
        {openModal.open&&<TacticalModal  openModal={openModal} fetchData={fetchData} setOpenModal={setOpenModal}/>}
    </>
}

function TacticalTable({Data,setOpenModal,fetchData,Pages,setPage}){    
    const handlePage=(page)=>{
        setPage({...Pages,page});
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
                    Dirección
                </Table.HeadCell>
                <Table.HeadCell>
                    Latitud
                </Table.HeadCell>
                <Table.HeadCell>
                    Longitud
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
            {Pages.data&&Pages.data.map((arr)=>(<TableRow Pages={Pages} setPage={setPage} fetchData={fetchData} key={arr._id} {...arr} setOpenModal={setOpenModal}/>))}
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

function TableRow({_id,Activo,Direccion,Latitud,Longitud,setOpenModal,Pages,setPage,fetchData}){
    const handleDelete=(_id)=>{
        if(window.confirm("¿Estás seguro de que deseas eliminar?")){
            axios.delete(`${process.env.API_URL}tactical`,{data:{_id}}).then(_=>{
                fetchData();
            }).catch(err=>{alert("Intentelo mas tarde...");});
        }
    }
    const handleCheck=(Activo,_id)=>{
        axios.put(`${process.env.API_URL}tactical/activo`, {_id,Activo}).then(({data})=> {
            const {ok,msg}=data;
            if(ok) setPage({...Pages,data:Pages.data.map((item)=>{
                if(item._id===msg._id) return msg;
                return item;
            })});
        }).catch(_ => {alert("Intentelo mas tarde...")});
    }
    
    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4">
            <Checkbox checked={Activo} onChange={(e)=>handleCheck(!Activo,_id)}/>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {Direccion}
        </Table.Cell>
        <Table.Cell>
            {Latitud}
        </Table.Cell>
        <Table.Cell>
            {Longitud}
        </Table.Cell>
        <Table.Cell className="w-10">
            <Button.Group>
                <Button color="gray" onClick={()=>{setOpenModal({open:true,update:true,
                    form:{
                        _id,
                        Activo,
                        Direccion,
                        Latitud,
                        Longitud
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

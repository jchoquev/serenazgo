import { Select ,Table,TextInput,Label,Pagination,Checkbox,Button,Modal} from "flowbite-react";
import UserModal from "../modals/StaffModal";
import { useState,useEffect } from "react";
import {MdEditSquare,MdDelete,MdPlaylistAddCircle} from 'react-icons/md'
import {FaBed,FaSearch} from "react-icons/fa"
import axios from "axios";
import moment from "moment-timezone";
export default function StaffDataTable({DataPosition,DataGroup}){
    const [Data,setData]=useState(null)
    const [Page,setPage]=useState({pages:0,page:1,find:" ",perpageOption:[5,10,20,30,100],perpage:5});

    const [openModal, setOpenModal] = useState({open:false,update:false,form:{}});
    const [openModalBed,setOpenModalBed]=useState({open:false})
    
    const fetchData=()=>{
        axios.get(`${process.env.API_URL}staff/page/${Page.page||1}/${Page.find}/${Page.perpage}`).then(({data})=>{
            setData(data.Data)
            setPage({...Page,pages:data.totalPages})
        }).catch(error=>{
            alert("Ocurrio un error, intentelo de nuevo...")
        });
    }
    const handleSelect=(e)=>{ setPage({...Page,[e.target.name]:Number(e.target.value)});}
    const handlePage=(page)=>{setPage({...Page,page:page})};
    const handleInput=(e)=>{
        let value=e.target.value
        if(value==="") value=" ";
        setPage({...Page,[e.target.name]:value})
    }
    const handleFind=()=>{
        fetchData();
    }

    useEffect(()=>{
        fetchData();
    },[Page.page,Page.perpage]);
    
    return <div className="overflow-x-auto">
        <div className="flex justify-between">
            <div>
                <div class="flex flex-row items-center">
                    <div className="mr-1">Mostrar</div>
                    <div>
                        <Select id="countries" sizing="sm" name="perpage" onChange={handleSelect} required>
                            {Page && Page.perpageOption.map(item => <option value={item} selected={item===Page.perpage}>{item}</option>)}
                        </Select>
                    </div>
                    <div className="ml-1">registros</div>
                </div>
            </div>
            <div className="order-last">
                <div class="flex flex-row items-center">
                    <div>
                        <TextInput name="find" sizing="sm" onChange={handleInput} type="text"/>
                    </div>
                    <div className="ml-1">
                        <button className="border border-zinc-400 w-full p-1 rounded-full " onClick={handleFind}> <FaSearch className="h-5"/> </button>
                    </div>
                    <div>
                        <button className="" onClick={()=>{setOpenModal({open:true,update:false,form:{}})}}>
                            <MdPlaylistAddCircle className="w-5 h-full text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Table className="table-auto">
            <Table.Head>
                <Table.HeadCell>
                    <span className="sr-only">
                        Activo
                    </span>
                </Table.HeadCell>
                <Table.HeadCell>
                    # documento
                </Table.HeadCell>
                <Table.HeadCell>
                    Apellidos y nombres
                </Table.HeadCell>
                <Table.HeadCell>
                    # de celular
                </Table.HeadCell>
                <Table.HeadCell>
                    Cargo
                </Table.HeadCell>
                <Table.HeadCell>
                    Grupo
                </Table.HeadCell>
                <Table.HeadCell>
                    Dia Libre
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {Data&&Data.map((arr)=>(<TableRow setOpenModal={setOpenModal} fetchData={fetchData} key={arr._id} {...arr} setOpenModalBed={setOpenModalBed}/>))}
            </Table.Body>
        </Table>
        {Page&&<div className="flex items-center justify-center text-center">
            <Pagination
                currentPage={Page.page}
                layout="pagination"
                nextLabel="Anterior"
                previousLabel="Siguiente"
                showIcons
                onPageChange={page=>{handlePage(page)}}
                totalPages={Page.pages}
                />
        </div>}
        {openModalBed.open&&<ModalFreeTime Page={Page} fetchData={fetchData} openModalBed={openModalBed} setOpenModalBed={setOpenModalBed}/>}
        {openModal.open&&<UserModal openModal={openModal} setOpenModal={setOpenModal} DataPosition={DataPosition} DataGroup={DataGroup} fetchData={fetchData}/>}
    </div>
}

function TableRow({_id,NDocumento,fullNombres,Cargo,Grupo,Activo,NCelular,LibreDesde,LibreHasta,setOpenModalBed,fetchData,setOpenModal}){
    const handleDelete=(_id)=>{
        if(window.confirm("¿Estás seguro de que deseas eliminar?")){
            axios.delete(`${process.env.API_URL}staff`,{data:{_id}}).then(_=>{
                fetchData();
            }).catch(err=>{alert("Intentelo mas tarde...");});
        }
    }
    const handleCheck=(Activo,_id)=>{
        axios.put(`${process.env.API_URL}staff/activo`, {_id,Activo}).then(_=> {
            fetchData();
        }).catch(_ => { alert("Intentelo mas tarde...")});
    }
    
    return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4">
            <Checkbox checked={Activo} onChange={()=>{handleCheck(!Activo,_id)}}/>
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {NDocumento}
        </Table.Cell>
        <Table.Cell>
            {fullNombres}
        </Table.Cell>
        <Table.Cell>
            {NCelular}
        </Table.Cell>
        <Table.Cell>
            {Cargo.Cargo}
        </Table.Cell>
        <Table.Cell>
            {Grupo.Grupo}
        </Table.Cell>
        <Table.Cell>
            {<DayFree desde={LibreDesde} hasta={LibreHasta}/>}
        </Table.Cell>
        <Table.Cell className="w-10">
            <Button.Group>
                <Button color="gray" onClick={()=>{
                    setOpenModal({open:true,form:{
                        _id,NDocumento,fullNombres,Cargo,Grupo,Activo,NCelular
                    }})
                }} >
                    <MdEditSquare/>
                </Button>
                <Button color="gray" onClick={()=>{
                    setOpenModalBed({open:true,form:{
                        _id,
                        LibreDesde:LibreDesde&&moment(LibreDesde).format("YYYY-MM-DD"),
                        LibreHasta:LibreHasta&&moment(LibreHasta).format("YYYY-MM-DD")
                    }})
                }} >
                    <FaBed/>
                </Button>
                <Button color="gray" onClick={()=>{handleDelete(_id)}}>
                    <MdDelete className="text-red-700"/>
                </Button>
            </Button.Group>
        </Table.Cell>
    </Table.Row>
}

function DayFree({desde,hasta}){
    if(!desde&&!hasta){
        return <>-</>
    }else if(desde===hasta){
        return <>{moment(desde).format("DD/MM/YYYY")}</>
    }else if(desde!=null&&hasta!=null){
        return <>{moment(desde).format("DD/MM/YYYY")} - {moment(hasta).format("DD/MM/YYYY")}</>
    }else{
        return <>-</>
    }
}

function ModalFreeTime({openModalBed,setOpenModalBed,fetchData}){
    const form=openModalBed.form;
    const handleInput=(e)=>{
        setOpenModalBed({...openModalBed,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleSubmit=(e)=>{
        e.preventDefault(openModalBed)
        form.LibreDesde=moment.tz(form.LibreDesde,'America/Lima').utc()
        form.LibreHasta=moment.tz(form.LibreHasta,'America/Lima').utc()
        axios.put(`${process.env.API_URL}staff/freedays`, form).then(_=> {
            setOpenModalBed({...openModalBed,open:false});
            fetchData();
        }).catch((err)=> {
            //console.error(err)
            //setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
        });
    }
    return <>
        <Modal show={openModalBed.open} size="md" popup onClose={() => setOpenModalBed({...openModalBed,open:false})}>
            <Modal.Header />
            <Modal.Body>
            <form className="space-y-1" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label  value="Desde" />
                    </div>
                    <TextInput type="date" name="LibreDesde" min={moment().format("YYYY-MM-DD")} value={form.LibreDesde} onChange={handleInput} required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label  value="Hasta" />
                    </div>
                    <TextInput type="date" name="LibreHasta" min={moment().format("YYYY-MM-DD")} value={form.LibreHasta} onChange={handleInput} required />
                </div>
                <div className="w-full pt-1">
                    <Button size="sm" className="w-full" type="submit">ACTUALIZAR</Button>
                </div>
            </form>
            </Modal.Body>
        </Modal>
    </>
}
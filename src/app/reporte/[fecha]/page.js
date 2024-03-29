"use client"
import React, { useState,useEffect } from "react";
import { Table,Button,Modal ,Spinner } from "flowbite-react"
import moment from "moment";
import axios from "axios";
import { FaFilePdf , FaCar,FaMotorcycle} from "react-icons/fa";
import MyDocument from "@/components/pdf/PDFViewer";
import { VehiculoTacticoIa,MotorizadoTacticoIa,OcurrenciaIa } from "@/functions/BardIa/google";
import { PDFViewer } from '@react-pdf/renderer';

moment.locale("es");

export default function Reporte({params}){
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const [openModal, setOpenModal] = useState({open:false});
    
    const fecha=moment(params.fecha, "DD-MM-YYYY",true)
    
    //const {listResponsables,Responsables:responsable}=data
    //const Responsables = responsable.filter((item) => listResponsables.indexOf(item._id) !== -1);
    const i=0
    
    useEffect(()=>{
        if(fecha.isValid()) fetchData(fecha);
        //run(setDataia);
    },[params.fecha]);

    const fetchData= (param)=>{
        axios.get(`${process.env.API_URL}/reporte`,{params:params}).then(({data,status})=>{
          const {ok,msg}=data
          if(!ok) setData(null);
          setData(msg);
        }).catch((e)=>{setData(null)});
    }

    if(!fecha.isValid()){
        return <>
            Fecha Invalida
        </>
    }

    return <>
        
        <div className="container mx-auto text-[16px] ">
            <Table>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>PLACA</Table.HeadCell>
                        <Table.HeadCell>T-VEHICULO</Table.HeadCell>
                        <Table.HeadCell>TURNO</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data&&data.Registro&&data.Registro.map((item)=>{
                            return <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item.Numero||""}
                                </Table.Cell>
                                <Table.Cell>{item.IdPlaca||""}</Table.Cell>
                                <Table.Cell>{item.TipoVehiculo||""}</Table.Cell>
                                <Table.Cell>{item.Turno.Turno||""}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group outline>
                                        <Button size="xs" color="gray" key={item._id+"7"}
                                            onClick={
                                                async () => {
                                                    setShow(true)
                                                    const txtTactico = await VehiculoTacticoIa(fecha,TrTacticos(item,data));
                                                    const txtOcurrencia=await OcurrenciaIa(false,fecha,TrIncidentes(item,data));
                                                    setOpenModal(
                                                        {
                                                            ...openModal,
                                                            open:true,
                                                            data:item,
                                                            fecha,
                                                            Responsables:TrResponsable(item,data),
                                                            Tactico:txtTactico,
                                                            Ocurrencia:txtOcurrencia,
                                                            esMOto:false,
                                                        }
                                                    )
                                                    setShow(false)
                                                } }><FaCar />
                                        </Button>
                                        <Button size="xs" color="gray"  
                                            onClick={
                                                async () =>{
                                                    setShow(true)
                                                    const txtTactico = await MotorizadoTacticoIa(fecha,TrTacticos(item,data));   
                                                    const txtOcurrencia=await OcurrenciaIa(true,fecha,TrIncidentes(item,data));
                                                    setOpenModal(
                                                        {
                                                            ...openModal,
                                                            open:true,
                                                            data:item,
                                                            fecha,
                                                            Responsables:TrResponsable(item,data),
                                                            Tactico:txtTactico,
                                                            Ocurrencia:txtOcurrencia,
                                                            esMOto:true,
                                                        }
                                                    )
                                                    setShow(false)
                                                }}><FaMotorcycle  />
                                        </Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
            </Table>
        </div>
        <ModalPDF openModal={openModal} setOpenModal={setOpenModal} />
        <div className={`fixed top-0 left-0 w-full h-full bg-white bg-opacity-30 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
            <Spinner />
        </div>
    </>
}


function ModalPDF({openModal,setOpenModal} ) {  
    const {Tactico,Ocurrencia,esMOto}=openModal
    return (
      <>
        <Modal show={openModal.open} size={"5xl"} onClose={() => setOpenModal({...openModal,open:false})}>
          <Modal.Body>
            <PDFViewer className="w-full h-[30rem] " scale="100%">
                <MyDocument data={openModal.data || {} }  esMOto={esMOto} Tactico={Tactico||[]} Ocurrencia={Ocurrencia||[]} Fecha={openModal.fecha||""}  Responsables={openModal.Responsables  || []} />
            </PDFViewer>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal({...openModal,open:false})}>Salir</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

function TrResponsable(item,data){
    const listResponsables=item.Responsables || []
    const {Responsables}=data || {}
    return Responsables.filter((item) => listResponsables.indexOf(item._id) !== -1);
}


function TrTacticos(item,data){
    const {Tactico:lisTactico}=item || []
    const {Tactico}=data || {}
    return Tactico.filter((item) => (lisTactico.indexOf(item._id) !== -1)&&(item.Completo===true))
}

function TrIncidentes(item,data){
    const {Incidencia:listOcurrencia}=item || []
    const {Incidencia}=data || {}
    return Incidencia.filter((item) => (listOcurrencia.indexOf(item._id) !== -1));
}

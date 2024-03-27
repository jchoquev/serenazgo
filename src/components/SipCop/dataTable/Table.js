import { useState,useEffect } from "react";
import { Table,Button,Checkbox,TextInput} from "flowbite-react";

import {BsFillPatchCheckFill} from "react-icons/bs"
import { FaOilCan } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi2";
import SipcopModal from "../modals/Tactico/modal";
import {RiGpsFill} from 'react-icons/ri'
import {BiSolidEditLocation,BiSolidTimeFive} from 'react-icons/bi'
import {BsPersonLinesFill ,BsPatchPlusFill,BsListOl } from 'react-icons/bs'
import TacticoModal from "../modals/Tactico/tactico";
import ListTacticoModal from "../modals/Tactico/listTactico";
import KilometrajeModal from "../modals/kilometraje/kilometraje";
import OdometroModal from "../modals/odometro/odometro";
import EncargadosModal from "../modals/encargado/encargado";
import ListEncargadoModal from "../modals/encargado/List/list";
import IncidenciaModal from "../modals/incidencia/incidencia";
import ListIncidenciaModal from "../modals/incidencia/listIncidencia";

/*Prueba */
import { useSelector, useDispatch } from 'react-redux'
import { fetchFindSipCop } from "@/Redux/Slice/sipcopSlice";
import { udpReporte } from "@/Redux/Slice/modalSlice";
import { 
  updModalKm,
  updModalSipCop,
  udpModalOdometro,
  udpModalEncargado,
  udpModalListEncargado,
  udpModalTactico,
  udpModalListTactico,
  udpModalIncidencia,
  fetchFindResposables,
  fetchFindTactico,
  fetchFindIncidencias,
  fetchVhActivo,
  udpModalListIncidencia,
  udpModalVale
} from "@/Redux/Slice/modalSlice";
/*Prueba */
import ValeSipcopModal from "../modals/vale/modal";
import ReporteModal from "../modals/reporte/modal";
export default function SipcopTable({User}){ 
    const dispatch = useDispatch()
    return <>
        <div className="relative w-full">
          <div className="grid grid-cols-2 gap-1 absolute top-0 right-0 z-10 pr-1 pt-1">
            <div>
              <button className="" 
                onClick={()=>{
                  dispatch(updModalSipCop({key:'data',value:[]}))
                  dispatch(updModalSipCop({key:'open',value:true}))
                  dispatch(fetchVhActivo({_idTurno:User&&User.Grupo.Turno._id||'-1',from:User&&User.iSession||"0000-00-00",until:User&&User.fSession||"0000-00-00"}));
                }}
              >
                  <BsFillPatchCheckFill className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
              </button>
            </div>
            <div>
              <button onClick={()=>{
                dispatch(udpReporte({key:"open",value:true}))
              }}>
                  <HiDocumentText className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
              </button>
            </div>
          </div>
            <Tablef User={User} />
        </div>
        <SipcopModal User={User} />
        <ReporteModal User={User} />
        
    </>
}

function Tablef({User}){
    const List= useSelector((state) => state.SipCop.ListSipCops)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchFindSipCop(User&&User.iSession,User&&User.fSession,User&&User.Grupo.Turno._id))
    },[]);
  
      return <>
          <div className="overflow-x-auto"><Table>
            <Table.Head>
              <Table.HeadCell className="p-4"> </Table.HeadCell>
              <Table.HeadCell className="text-center">
                #
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Km
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Odometro
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Placa
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Encargados
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Tactico
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Incidencia
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Combust.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Zona
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Observación
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {List&&List.map((row)=>(<TableRow key={row._id} {...row} Nombres={User&&User.fullNombres}/>))}
            </Table.Body>
          </Table></div>
          
          <TacticoModal/>
          <ListTacticoModal/>
          <EncargadosModal/>
          <ListEncargadoModal/>
          <OdometroModal/>
          <KilometrajeModal/>
          <IncidenciaModal/>
          <ListIncidenciaModal/>
          <ValeSipcopModal/>
      </>
}
function TableRow(data){
  const dispatch=useDispatch();
  const {_id,IdVehiculo,Activo,Numero,Kilometraje,IdPlaca,Zona,Observacion,Incidencia,Responsables,OdometroInicial,OdometroFinal,Tactico,Nombres,Vale}=data;
  return (<>
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        <CheckboxActivo _id={_id} Activo={Activo}/>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {Numero}
      </Table.Cell>
      <Table.Cell>
        <Button color="gray" size="sm"
          onClick={()=>dispatch(updModalKm({open:true,form:{...Kilometraje,Verificado2:Kilometraje.Verificado,_id,Numero,Nombres}}))}>
          <RiGpsFill className="w-5 h-5"/>
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button color="gray" size="sm" className="relative" onClick={()=>{
            dispatch(udpModalOdometro({key:"open",value:true}))
            dispatch(udpModalOdometro({key:"form",value:{OdometroInicial,OdometroFinal,_id,Numero}}))
        }}>
          <BiSolidEditLocation className="w-5 h-5"/>
        </Button>
      </Table.Cell>
      <Table.Cell>
        {IdPlaca}
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button color="gray" className="w-full" size="sm" onClick={
              ()=>{
                dispatch(udpModalEncargado({key:"open",value:true}))
                dispatch(udpModalEncargado({key:"form",value:{_idSipCop:_id,_idVehicle:IdVehiculo}}))
                dispatch(udpModalEncargado({key:"update",value:false}))
              }
            }>
              <BsPersonLinesFill className="w-5 h-5"/>
          </Button>
          <Button color="gray" className={`w-full ${(Responsables.length<=0)?"hidden":""}`} onClick={
            ()=>{
              dispatch(udpModalListEncargado({key:'List',value:[]}))
              dispatch(fetchFindResposables(Responsables))
              dispatch(udpModalListEncargado({key:'open',value:true}))
            }}  size="sm">
              <BsListOl className="w-5 h-5"/>
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button color="gray" className="w-full" size="sm" onClick={
            ()=>{
              dispatch(udpModalTactico({key:"form",value:{_id,Numero}}))
              dispatch(udpModalTactico({key:"open",value:true}))
              dispatch(udpModalTactico({key:"update",value:false}))
            }}>
              <BiSolidTimeFive className="w-5 h-5"/>
          </Button>
          <Button color="gray" className={`w-full ${(Tactico.length<=0)?"hidden":""}`} size="sm" onClick={
              ()=>{
                dispatch(udpModalListTactico({key:"List",value:[]}))
                dispatch(udpModalListTactico({key:"sipcop",value:{Numero}}))
                dispatch(fetchFindTactico(Tactico))
                dispatch(udpModalListTactico({key:"open",value:true}))
              }}>
              <BsListOl className="w-5 h-5"/>
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button color="gray" className="w-full" size="sm" onClick={
            ()=>{
              dispatch(udpModalIncidencia({key:"open",value:true}))
              dispatch(udpModalIncidencia({key:"form",value:{_idSipCop:_id,Numero}}))
            }
          }>
              <BsPatchPlusFill className="w-5 h-5"/>
          </Button>
          <Button color="gray" className={`w-full ${(Incidencia.length<=0)?"hidden":""}`} size="sm" onClick={
              ()=>{
                dispatch(udpModalListIncidencia({key:"List",value:[]}))
                dispatch(udpModalListIncidencia({key:"sipcop",value:{Numero}}))
                dispatch(fetchFindIncidencias({filtro:"porLista",Incidencia}))
                dispatch(udpModalListIncidencia({key:"open",value:true}))
              }}>
              <BsListOl className="w-5 h-5"/>
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>
        <Button color="gray" className="w-full" size="sm" onClick={
            ()=>{
              const estado=Vale?true:false
              const fdata=estado===true?Vale:{}
              dispatch(udpModalVale({key:'open',value:true}))
              dispatch(udpModalVale({key:"form",value:{...fdata,_idSipCop:_id,IdPlaca}}))
              dispatch(udpModalVale({key:"update",value:estado}))
            }
          }>
              <FaOilCan className="w-5 h-5"/>
        </Button>
      </Table.Cell>
      <Table.Cell>
        {Zona}
      </Table.Cell>
      <Table.Cell>
        <TextObservacion _id={_id} Observacion={Observacion}/>
      </Table.Cell>
    </Table.Row>
  </>)
}
//<BiSolidEditLocation className="w-5 h-5"/>
function CheckboxActivo({_id,Activo}){
  const [activo, setActivo] = useState({_id,Activo});
  return <Checkbox checked={activo.Activo}/>;
}

function TextObservacion({_id,Observacion}){
  const [obs, setObs] = useState({_id,Observacion});
  const handleChange = (e) => {
    setObs({...obs,Observacion:e.target.value});
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      //llenar
    }
  };
  return <TextInput sizing="sm" type="text"  value={obs.Observacion} onKeyDown={handleKeyDown} onChange={handleChange}/>;
}


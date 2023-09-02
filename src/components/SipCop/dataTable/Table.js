import { useState,useEffect } from "react";
import { Table,Button,Checkbox,TextInput} from "flowbite-react";
import axios from "axios";
import {BsFillPatchCheckFill} from "react-icons/bs"
import SipcopModal from "../modals/Tactico/modal";
import moment from "moment-timezone";
import {RiGpsFill} from 'react-icons/ri'
import {BiSolidEditLocation,BiSolidTimeFive} from 'react-icons/bi'
import {BsPersonLinesFill ,BsPatchPlusFill,BsListOl } from 'react-icons/bs'
import TacticoModal from "../modals/Tactico/tactico";
import ListTacticoModal from "../modals/Tactico/listTactico";
import KilometrajeModal from "../modals/kilometraje/kilometraje";
import OdometroModal from "../modals/odometro/odometro";
import EncargadosModal from "../modals/encargado/encargado";
import ListEncargadoModal from "../modals/encargado/List/list";
export default function SipcopTable({User}){ 
    const [openModal, setOpenModal] = useState({open:false,update:false,form:null});
    return <>
        <div className="relative w-full">
            <button className="absolute top-0 right-0 z-10 pr-1 pt-1" onClick={()=>{setOpenModal({open:true,update:false})}}>
                <BsFillPatchCheckFill className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
            </button>
            <Tablef User={User}/>
        </div>
        {openModal.open&&<SipcopModal User={User} openModal={openModal} setOpenModal={setOpenModal}/>}
    </>
}

function Tablef({User}){
    const [data, setData] = useState(null);
    const [position,setPosition] = useState(null);
    //Modals
    const [tactico,setTactico]=useState({open:false})
    const [lisTactico,setlisTactico]=useState({open:false})
    const [kmModal,setKmModal]=useState({open:false,inicial:false})
    const [odometroModal,setOdometroModal]=useState({open:false,inicial:false})
    const [encargadoModal,setEncargadoModal]=useState({open:false,inicial:false})
    const [incidencia,setIncidencia]=useState({open:false})
    //Modals list
    const [listStaff,setListStaff]=useState({open:false,List:[]})
    //End-Modals
    const fetchData= (params)=>{
        axios.get(`${process.env.API_URL}/sipcop/getday`,{params}).then(({data,status})=>{
          if(status===400) setData(null);
          data.ok&&setData(data.msg);
        }).catch(()=>{setData(null)});
    }

    const fetchPosition=()=>{
      axios.get(`${process.env.API_URL}staff/position`,{}).then(({data})=>{
          const {ok,msg}=data;
          ok&&setPosition(msg)
      }).catch(err=>{alert("Ocurrio un error, intentelo de nuevo ...")});
    }
  
    useEffect(() => {
      const Fechai=moment().tz('America/Lima').startOf('day').toDate()
      const Fechaf=moment().tz('America/Lima').endOf('day').toDate()
      fetchData({Fechai,Fechaf,idTurno:User&&User.Grupo.Turno._id});
      fetchPosition();
    },[]);
  
      return <>
          <Table>
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
                Zona
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Observación
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data&&data.map((row)=>(<TableRow key={row._id} {...row} Nombres={User&&User.fullNombres} setTactico={setTactico} 
                  setKmModal={setKmModal} 
                  setlisTactico={setlisTactico} 
                  setOdometroModal={setOdometroModal}
                  setEncargadoModal={setEncargadoModal}
                  setListStaff={setListStaff}
                  />))}
            </Table.Body>
          </Table>
          {tactico.open&&<TacticoModal tactico={tactico} setTactico={setTactico} dataTable={data} setData={setData}/>}
          {lisTactico.open&&<ListTacticoModal lisTactico={lisTactico} setlisTactico={setlisTactico} dataTable={{datas:data,setData}} setTactico={setTactico}/>}
          {kmModal.open&&<KilometrajeModal kmModal={kmModal} setKmModal={setKmModal} dataTable={data} setData={setData}/>}
          {odometroModal.open&&<OdometroModal odometroModal={odometroModal} setOdometroModal={setOdometroModal} dataTable={data} setData={setData}/>}
          {encargadoModal.open&&<EncargadosModal position={position} encargadoModal={encargadoModal} setEncargadoModal={setEncargadoModal}  dataTable={data} setData={setData}/>}
          {listStaff.open&&<ListEncargadoModal listStaff={listStaff} setListStaff={setListStaff} setEncargadoModal={setEncargadoModal}/>}
 
      </>
}

function TableRow(data){
  const {_id,Activo,Numero,IdPlaca,Zona,Observacion,KMinicial,KMfinal,Responsables,OdometroInicial,OdometroFinal,setTactico,setlisTactico,Tactico,setKmModal,Nombres,setOdometroModal,setEncargadoModal
  ,setListStaff}=data;
  return (<>
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        <CheckboxActivo _id={_id} Activo={Activo}/>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {Numero}
      </Table.Cell>
      <Table.Cell>
        <Button.Group className="w-full">
            <Button color="gray" size="sm" className="relative" onClick={()=>setKmModal({open:true,inicial:true,form:{...KMinicial,_id,Numero,Nombres,vini:KMinicial.Verificado}})}>
              <span className="absolute bottom-0 left-0 -mb-1 -ml-1 w-3 h-3 bg-green-500 rounded-full"></span>
              <RiGpsFill className="w-5 h-5"/>
            </Button>
            <Button color="gray" size="sm" className="relative" onClick={()=>setKmModal({open:true,inicial:false,form:{...KMfinal,_id,Numero,Nombres,vini:KMfinal.Verificado}})}>
              <span className="absolute bottom-0 right-0 -mb-1 -ml-1 w-3 h-3 bg-red-500 rounded-full"></span>
              <RiGpsFill className="w-5 h-5"/>
            </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>
        <Button color="gray" size="sm" className="relative" onClick={()=>setOdometroModal({open:true,inicial:false,form:{_id,Numero,OdometroInicial,OdometroFinal}})}>
          <BiSolidEditLocation className="w-5 h-5"/>
        </Button>
      </Table.Cell>
      <Table.Cell>
        {IdPlaca}
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button color="gray" className="w-full" size="sm" onClick={()=>setEncargadoModal({open:true,update:false,form:{_id,Numero,Conductor:false}})}>
              <BsPersonLinesFill className="w-5 h-5"/>
          </Button>
          <Button color="gray" className={`w-full ${(Responsables.length<=0)?"hidden":""}`} onClick={()=>{
            setListStaff({open:true,value:{_id},List:Responsables})
          }}  size="sm">
              <BsListOl className="w-5 h-5"/>
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button color="gray" className="w-full" size="sm" onClick={()=>{setTactico({open:true,update:false,form:{_id,Numero,IdPlaca}})}}>
              <BiSolidTimeFive className="w-5 h-5"/>
          </Button>
          <Button color="gray" className={`w-full ${(Tactico.length<=0)?"hidden":""}`} size="sm" onClick={()=>{setlisTactico({open:true,values:{_id,Numero,IdPlaca},List:Tactico})}}>
              <BsListOl className="w-5 h-5"/>
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>
        <Button.Group>
          <Button color="gray" className="w-full" size="sm">
              <BsPatchPlusFill className="w-5 h-5"/>
          </Button>
          <Button color="gray" className="w-full" size="sm">
              <BsListOl className="w-5 h-5"/>
          </Button>
        </Button.Group>
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


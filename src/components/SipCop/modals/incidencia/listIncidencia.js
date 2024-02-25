import {Button,Modal,Table} from "flowbite-react";
import { MdEditSquare } from 'react-icons/md';
import {GrMap} from  'react-icons/gr';
import {CgListTree} from "react-icons/cg"
import {BsFillCheckCircleFill,BsFillDashCircleFill} from "react-icons/bs"

import { useSelector,useDispatch } from "react-redux";
import { udpModalListIncidencia,udpModalIncidencia } from "@/Redux/Slice/modalSlice";
import { updModalPoints } from "@/Redux/Slice/mapsSlice";
export default function ListIncidenciaModal(){
    const {ListIncidencia:{List,open,sipcop}}= useSelector((state) => state.Modal)
    const dispatch=useDispatch()
    return <>
        <Modal show={open} size="6xl" popup onClose={() => dispatch(udpModalListIncidencia({key:"open",value:false}))}>
            <Modal.Header>
                <div class="flex justify-start">
                    <div className="ml-4">
                        {List&&<Button color="gray" 
                            onClick={()=>{
                                dispatch(updModalPoints({key:"open",value:true}))
                                dispatch(updModalPoints({key:"title",value:"Lista de incidencias"}))
                                dispatch(updModalPoints({key:"List",value:evalPointsMap(List.filter((item)=>Boolean(item.Coordenadas)))}))
                            }}
                        ><CgListTree/></Button>}
                    </div>
                    <div>
                        <h3 className="font-bold uppercase text-green-900 ml-2">Lista incidencias ({sipcop&&sipcop.Numero})</h3>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                        <Table.HeadCell className="p-4">
                            En SIPCOP?
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Descripcion
                        </Table.HeadCell>
                        <Table.HeadCell>
                            TP/STP/MOD.
                        </Table.HeadCell>
                        <Table.HeadCell>
                            H. A/L/R
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Ubicación
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Dirección
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {List&&List.map((item,index)=>(<Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <Button color="gray"  onClick={()=>{
                                    dispatch(udpModalIncidencia({key:"form",value:{...item,Numero:sipcop&&sipcop.Numero}}))
                                    dispatch(udpModalIncidencia({key:"open",value:true}))
                                    dispatch(udpModalIncidencia({key:"update",value:true}))
                                    dispatch(udpModalListIncidencia({key:"open",value:false}))
                                }}>
                                    <MdEditSquare/>
                                </Button>
                            </Table.Cell>
                            <Table.HeadCell className="p-4">
                                {item.SIPCOP&&item.SIPCOP&&<BsFillCheckCircleFill className="h-5 w-5 text-emerald-600"/>}
                                {!item.SIPCOP&&<BsFillDashCircleFill className="h-5 w-5 text-red-600"/>}
                                
                            </Table.HeadCell>
                            <Table.Cell>
                                <p> <b>({index+1}) </b> {item.Descripcion}</p>
                            </Table.Cell>
                            <Table.Cell>
                                <OcurrenciaComponent Ocurrencia={item.Ocurrencia}/>
                            </Table.Cell>
                            <Table.Cell>
                                <HoraComponent HoraNotificacion={item.HoraNotificacion} HoraLlegada={item.HoraLlegada} HoraSeFue={item.HoraSeFue}/>
                            </Table.Cell>
                            <Table.Cell>
                                {item.Coordenadas&&<Button color="gray"  onClick={()=>{
                                    dispatch(updModalPoints({key:"open",value:true}))
                                    dispatch(updModalPoints({key:"title",value:"ubicacion de la incidencia N° "+(index+1)}))
                                    dispatch(updModalPoints({key:"List",value:evalPointsMap([item],index+1)}))
                                }}>
                                    <GrMap/>
                                </Button>}
                            </Table.Cell>
                            <Table.Cell>
                                <DireccionComponent TipoVia={item.TipoVia} Direccion={item.Direccion} TipoZona={item.TipoZona}/>
                            </Table.Cell>
                        </Table.Row>))}
                    </Table.Body>
                </Table>
            </Modal.Body>
      </Modal>
    </>
}

function evalPointsMap(List,index=-1){
    return List.map((item,i)=>{
        return {
            IPopup:`${item.Direccion||""} <br/> 
                <b>Hora Alerta/ Notificacion:</b> ${item.HoraNotificacion||""} <br/> 
                <b>Hora Llegada:</b> ${item.HoraLlegada||""} <br/> 
                <b>Hora Repliegue:</b> ${item.HoraSeFue||""} <br/>
            `,
            Coordenadas:item.Coordenadas,
            ITooltip:`Incidencia N° ${(index>=0)?index:(i+1)}`,
        }
    })
}

function HoraComponent({HoraNotificacion,HoraLlegada,HoraSeFue}){
    return <>
        {HoraNotificacion&&<><b>Hora Alerta/ Notificacion: </b> {HoraNotificacion} <br /></>}
        {HoraLlegada&&<><b>Hora Llegada: </b> {HoraLlegada} <br /></>}
        {HoraSeFue&&<><b>Hora Repliegue: </b> {HoraSeFue} <br /></>}
    </>
}

function DireccionComponent({TipoVia,Direccion,TipoZona}){
    return <>
        {TipoVia&&<><b>{TipoVia.label}</b> <br /></>}
        {Direccion&&<>{Direccion} <br /></>}
        {TipoZona&&<><b>{TipoZona.label}</b> <br /></>}
    </>
}
function OcurrenciaComponent({Ocurrencia}){
    return Ocurrencia&&<>
        <b>Tipo: </b> {Ocurrencia.Tipo} <br />
        <b>Sub Tipo: </b> {Ocurrencia.subTipo} <br />
        <b>Modalidad (Ocurrencia): </b> {Ocurrencia.label} <br />
    </>
}
/*

const IncidenciaSchema=new Schema({
    _idSipCop:{
        type:ObjectId,
        ref: 'SipCop',
        require:[true]
    },
    HoraNotificacion:{type:String,default:null},
    HoraLlegada:{type:String,default:null},
    HoraSeFue:{type:String,default:null},
    Ubicacion:{type:String,default:""},
    Coordenadas:{type:coordSchema,default:{}},
    Descripcion:{type:String,default:""},
    TipoVia:{type:Mixed,default:{}},
    Direccion:{type:String},
    Ocurrencia:{type:Mixed,default:{}},
    TipoZona:{type:Mixed,default:{}},
    SIPCOP:{type:Boolean,default:false},
    Turno:{type:String,default:""},
    FHregistro:{type:Date,default:Date.now},
    FHactualizacion:{type:Date,default:Date.now},
    FHeliminar:{type:Date,default:null},
},{ collection: 'Incidencias' });
*/
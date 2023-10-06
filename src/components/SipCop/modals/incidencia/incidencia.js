import {Button,Modal,Label,TextInput,Textarea,ToggleSwitch} from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { udpModalIncidencia,fetchFindIncSelects,fetchIncidencia} from "@/Redux/Slice/modalSlice";
import Select from 'react-select'

export default function IncidenciaModal(){
    const {Incidencia:{form,open,update,selects:{Ocurrencia,TipoZona,TipoVia}}}= useSelector((state) => state.Modal)
    const List= useSelector((state) => state.SipCop.ListSipCops)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchFindIncSelects({option:"Ocurrencia"}))
        dispatch(fetchFindIncSelects({option:"TipoZona"}))
        dispatch(fetchFindIncSelects({option:"TipoVia"}))  
    },[]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(fetchIncidencia({...form,update},List))
    }
    const handleChange=(e)=>{
        dispatch(udpModalIncidencia({key:"form",value:{...form,[e.target.name]:e.target.value}}))
    }
    const handleCheck=(key,value)=>{
        dispatch(udpModalIncidencia({key:"form",value:{...form,[key]:value}}))
    }

    const handleSelect=(key,value)=>{
        dispatch(udpModalIncidencia({key:"form",value:{...form,[key]:value}}))
    }
    
    return <>
        <Modal show={open} size="sm" popup onClose={() => dispatch(udpModalIncidencia({key:"open",value:false}))}>
            <Modal.Header>
                <h3 className="font-bold uppercase text-green-900 ml-4">Incidencia ({form&&form.Numero})</h3>
            </Modal.Header>
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Ocurrencia" />
                        </div>
                        <Select 
                            menuPosition="fixed" 
                            menuShouldScrollIntoView={true} 
                            value={form&&form.Ocurrencia||{}}
                            options={Ocurrencia}  
                            placeholder="Elige una opción"
                            onChange={(e) => handleSelect('Ocurrencia',e)}
                        />
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Hora alerta/notificación" />
                        </div>
                        <TextInput sizing="sm" type="time" step={1} name="HoraNotificacion" value={form&&form.HoraNotificacion||""} onChange={handleChange}/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Hora llegada" />
                        </div>
                        <TextInput sizing="sm" type="time" step={1} name="HoraLlegada" value={form&&form.HoraLlegada||""} onChange={handleChange}/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Hora se fue/repliegue" />
                        </div>
                        <TextInput sizing="sm" type="time" step={1} name="HoraSeFue" value={form&&form.HoraSeFue||""} onChange={handleChange}/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Ubicación" />
                        </div>
                        <TextInput name="Ubicacion" value={form&&form.Ubicacion||""} onChange={handleChange} placeholder="Ejemplo: -15.862978,-70.015716"/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Descripcion" />
                        </div>
                        <Textarea  className="text-sm p-2" rows={4} name="Descripcion" value={form&&form.Descripcion||""} onChange={handleChange} placeholder="Describa lo mas importante de la incidencia."  required/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Tipo de via" />
                        </div>
                        <Select menuPosition="fixed" 
                            onChange={(e) => handleSelect('TipoVia',e)} 
                            value={form&&form.TipoVia||{}}
                            menuShouldScrollIntoView={true} options={TipoVia} placeholder="Elige una opción"/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Dirección" />
                        </div>
                        <TextInput name="Direccion" value={form&&form.Direccion||""} onChange={handleChange}/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Tipo de zona" />
                        </div>
                        <Select menuPosition="fixed" 
                            value={form&&form.TipoZona||{}}
                            onChange={(e) => handleSelect('TipoZona',e)} 
                            menuShouldScrollIntoView={true} placeholder="Elige una opción" options={TipoZona}/>
                    </div>
                    <div>
                        <ToggleSwitch
                            checked={form&&form.SIPCOP}
                            label="En SIPCOP?"
                            onChange={()=>{handleCheck('SIPCOP',!form.SIPCOP)}}
                        />
                    </div>
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{update?"ACTUALIZAR":"AGREGAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </>
}


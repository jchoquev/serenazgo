import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Checkbox,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import {FaSearch} from 'react-icons/fa'
//import Select from 'react-select'

import { useSelector,useDispatch } from "react-redux";
import { udpModalTactico,fetchFindDireccion,fetchAddUpdTactico } from "@/Redux/Slice/modalSlice";

export default function TacticoModal(){
    const {Tactico:{form,open,update}}= useSelector((state) => state.Modal)
    const List= useSelector((state) => state.SipCop.ListSipCops)
    const dispatch=useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(fetchAddUpdTactico(form,update,List))
    }
    const handlePosicion=(e)=>{
        dispatch(udpModalTactico({key:"form",value:{...form,[e.target.name]:e.target.value.replace(/\s|°/g, "")}}))
    }

    const handleChange=(e)=>{
        dispatch(udpModalTactico({key:"form",value:{...form,[e.target.name]:e.target.value}}))
    }
    const handleCheck=(name,value)=>{
        dispatch(udpModalTactico({key:"form",value:{...form,[name]:value}}))
    }
    return <>
        <Modal show={open} size="sm" popup onClose={() => dispatch(udpModalTactico({key:"open",value:false}))}>
            <Modal.Header>
                <h4 className="font-bold uppercase text-green-900 ml-4">Tactico ({form&&form.Numero})</h4>
            </Modal.Header>
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Posición" />
                        </div>
                        <div className="flex justify-between">
                            <TextInput sizing="sm" className="w-full" onChange={handlePosicion}  name="Posicion" value={form&&form.Posicion||""} placeholder="Ejemplo: -15.862978,-70.015716" required/>
                            <Button color="gray" size="sm" className='self-end ml-1' pill onClick={()=>dispatch(fetchFindDireccion(form))}>
                                <FaSearch/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Dirección" />
                        </div>
                        <TextInput sizing="sm" name="Direccion" value={form&&form.Direccion||""}  onChange={handleChange}required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Llego" />
                        </div>
                        <TextInput sizing="sm" type="time" name="HLlegada" value={form&&form.HLlegada||""}   onChange={handleChange}step="1" required/>
                    </div>
                    {update&&<div>
                        <div className="mb-1 block">
                            <Label value="Se ira" />
                        </div>
                        <TextInput sizing="sm" type="time" name="HSeira" value={form&&form.HSeira||""}  onChange={handleChange}step="1" required/>
                    </div>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Observacion" />
                        </div>
                        <TextInput sizing="sm" name="Observaciones" value={form&&form.Observaciones||""} onChange={handleChange} />
                    </div>
                    {update&&<div>
                        <ToggleSwitch
                            checked={form&&form.Completo}
                            label="Cumplio"
                            onChange={()=>{handleCheck('Completo',!form.Completo)}}
                        />
                    </div>}
                    <div>
                        <ToggleSwitch
                            checked={form&&form.Revisar}
                            label="Revisado con (GPSSCAN)"
                            onChange={()=>{handleCheck('Revisar',!form.Revisar)}}
                        />
                    </div>
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">ACTUALIZAR</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}
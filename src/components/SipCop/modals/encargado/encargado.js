import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Badge,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import {FaSearch} from 'react-icons/fa'
import Select from 'react-select'

import { useSelector,useDispatch } from "react-redux";
import { fetchSelectRole } from "@/Redux/Slice/roleSlice";
import { udpModalEncargado,fetchFindDNI } from "@/Redux/Slice/modalSlice";
import { fetchUpdEncargado } from "@/Redux/Slice/modalSlice";

function EncargadosModal(){
    const {select:{values}}= useSelector((state) => state.Role)
    const {Encargado:{form,open,update}}= useSelector((state) => state.Modal)
    const dispatch=useDispatch()
    
    useEffect(()=>{
        dispatch(fetchSelectRole())
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(fetchUpdEncargado({...form,update}))
    }
    const handleChange=(e)=>{
        dispatch(udpModalEncargado({key:"form",value:{...form,[e.target.name]:e.target.value}}))
    }

    const handleFindDNI=()=>{
        dispatch(fetchFindDNI(form))
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleFindDNI()
        }
    };
    const handleSelect=(key,value)=>{
        dispatch(udpModalEncargado({key:"form",value:{...form,[key]:value}}))
    }
         
    return <>
        <Modal show={open} size="sm" popup onClose={() => dispatch(udpModalEncargado({key:"open",value:false}))}>
            <Modal.Header >
                <h4 className="ml-4 font-bold uppercase">Encargado</h4>
            </Modal.Header>
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-1 block">
                            <Label value="DNI" />
                        </div>
                        <div className="flex justify-between">
                            <TextInput sizing="sm" onKeyPress={handleKeyPress} className="w-full" name="DNI" minlength="8" onChange={handleChange} value={form&&form.DNI||""} required/>
                            <Button color="gray" size="sm" className='self-end ml-1' pill  onClick={handleFindDNI}>
                                <FaSearch/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Apellidos y Nombres" />
                        </div>
                        <TextInput sizing="sm" name="Nombres" value={form&&form.Nombres||""} onChange={handleChange} required/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Rol" />
                        </div>
                        <Select menuPosition="fixed" value={form&&form.Rol||{}} onChange={(e) => handleSelect('Rol',e)} menuShouldScrollIntoView={true} options={values.map((option)=>({value: option._id, label:option.Value}))}  required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="# de celular"/>
                        </div>
                        <TextInput sizing="sm" name="NCelular" value={form&&form.NCelular||""} onChange={handleChange} required/>
                    </div>  
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{update?"ACTUALIZAR":"GUARDAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}
export default EncargadosModal;
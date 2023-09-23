import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Badge,Label,TextInput} from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { updModalRole,fetchAddRole } from "@/Redux/Slice/roleSlice";

export default function RoleModal(){
    const {List:{data},modalIns:{form,open,update}}= useSelector((state) => state.Role)
    const dispatch = useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(fetchAddRole({...form,update},data))
    }
    const handleChange=(e)=>{
        dispatch(updModalRole({key:'form',value:{...form,[e.target.name]:e.target.value}}))
    }
    const handleCheck=(name,value)=>{
        //dispatch(updOneModalKm({key:'form',value:{...form,[name]:value}}))
    }
    return <>
        <Modal show={open} size="sm" popup onClose={() => dispatch(updModalRole({key:'open',value:false}))}>
            <Modal.Header className="space-y-1">
                <h3 className={"px-4 font-bold"}>
                    {update?"ACTUALIZAR":"AGREGAR"} ROL
                </h3>
            </Modal.Header>
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Rol" />
                        </div>
                        <TextInput sizing="sm" type="text" name="Value" value={form&&form.Value||""} onChange={handleChange} required/>
                    </div>  
                    <div>
                        <Button size="sm" className={`w-full`} type="submit">{update?"ACTUALIZAR":"GUARDAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </>
}
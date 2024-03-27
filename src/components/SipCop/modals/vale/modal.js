import { useState,useEffect } from "react";
import {Button,Modal,Table,Checkbox,Label,TextInput} from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { updModalSipCop,fetchVhActivo,insListSipCop,udpModalVale,fetchInsVale} from "@/Redux/Slice/modalSlice";

export default function ValeSipcopModal(){
    const {form,open,update}= useSelector((state) => state.Modal.Vale)
    const List= useSelector((state) => state.SipCop.ListSipCops)
    const dispatch = useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(fetchInsVale({...form,update},List))
    }
    const handleChange=(e)=>{
        e.preventDefault()
        dispatch(udpModalVale({key:"form",value:{...form,[e.target.name]:e.target.value}}))
    }
    return <>
        <Modal show={open} size="md" popup onClose={() => dispatch(udpModalVale({key:'open',value:false}))}>
            <Modal.Header className="ml-4 font-bold">{form&&form.IdPlaca} </Modal.Header>
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Numero de Vale" />
                        </div>
                        <TextInput sizing="sm" type="number" name="NumVale" value={form.NumVale||""} onChange={handleChange}  required/>
                    </div> 
                    <div>
                        <div className="mb-1 block">
                            <Label value="Kilometraje" />
                        </div>
                        <TextInput sizing="sm" type="number" name="KM" value={form.KM||""} onChange={handleChange} required/>
                    </div> 
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{update?"ACTUALIZAR":"GUARDAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}
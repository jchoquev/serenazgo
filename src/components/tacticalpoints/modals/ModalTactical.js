import { useState } from "react";
import axios from "axios";
import {Button, Label, TextInput,Modal,Alert,ToggleSwitch,Textarea } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';

function TacticalModal({openModal,fetchData,setOpenModal}){
    const [err, setErr] = useState({err:false,msg:""});
    let form=openModal.form;
    const handleChange=(e)=>{
        setOpenModal({...openModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleCheck=(Activo)=>{
        setOpenModal({...openModal,form:{...form,Activo:Activo}})
    }
    const fetchUpdate=(data)=>{
        if(!openModal.update){
            axios.post(`${process.env.API_URL}tactical`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData();
            }).catch(_ => { 
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            axios.put(`${process.env.API_URL}tactical`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData();
            }).catch(_ => {
                setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
            });
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        fetchUpdate(form);
    }
    return <>
        <Modal show={openModal.open} size="md" popup onClose={() => setOpenModal({...openModal,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Dirección" />
                        </div>
                        <TextInput sizing="sm" name="Direccion" value={form.Direccion||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Latitud" />
                        </div>
                        <TextInput sizing="sm" type="number" name="Latitud" value={form.Latitud||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Longitud" />
                        </div>
                        <TextInput sizing="sm" type="number" name="Longitud" value={form.Longitud||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <ToggleSwitch
                            checked={form.Activo}
                            label="Activo"
                            onChange={()=>{handleCheck(!form.Activo)}}
                        />
                    </div>
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{!openModal.update?"GUARDAR":"ACTUALIZAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}

export default TacticalModal;
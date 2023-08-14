import { useState } from "react";
import axios from "axios";
import {Button, Label, TextInput,Modal,Alert,ToggleSwitch } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import Select from 'react-select'

export default function UserModal({openModal,fetchData,setOpenModal,DataGroup,DataPosition}){
    const [err, setErr] = useState({err:false,msg:""});
    let form=openModal.form;
    const handleChange=(e)=>{
        setOpenModal({...openModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleCheck=(Activo)=>{
        setOpenModal({...openModal,form:{...form,Activo:Activo}})
    }
    const handleSelect=(name,value)=>{
        setOpenModal({...openModal,form:{...form,[name]:value}})
    }
    const fetchUpdate=(data)=>{
        if(!openModal.update){
            axios.post(`${process.env.API_URL}staff`, data).then(_=> {
                //setOpenModal({...openModal,open:false});
                //fetchData(Page.page);
                alert("Insertado")
            }).catch((e) => { 
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            axios.put(`${process.env.API_URL}handy`, data).then(_=> {
                setOpenModal({...openModal,open:false});
                fetchData(Page.page);
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
                            <Label value="# de documento" />
                        </div>
                        <TextInput sizing="sm" name="NDocumento" minlength="8" value={form.NDocumento||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Nombres" />
                        </div>
                        <TextInput sizing="sm" name="Nombres" value={form.Nombres||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Apellido Paterno" />
                        </div>
                        <TextInput sizing="sm" name="ApePaterno" value={form.ApePaterno||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Apellido Materno" />
                        </div>
                        <TextInput sizing="sm" name="ApeMaterno" value={form.ApeMaterno||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="# de celular" />
                        </div>
                        <TextInput sizing="sm" name="NCelular" minlength="5" value={form.NCelular||""} onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Cargo" />
                        </div>
                        {DataPosition&&<Select onChange={(select)=>{handleSelect('Cargo',select)}} value={form.Cargo||{}} options={DataPosition.map((option)=>({...option, value: option._id, label:option.Cargo}))} required/>}
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Grupo" />
                        </div>
                        {DataGroup&&<Select onChange={(select)=>{handleSelect('Grupo',select)}} value={form.Grupo||{}} options={DataGroup.map((option)=>({ ...option,value: option._id, label:option.Grupo}))} required/>}
                    </div>
                    <div>
                        <ToggleSwitch
                            checked={form.Activo}
                            label="Activo"
                            onChange={()=>{handleCheck(!(form.Activo))}}
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
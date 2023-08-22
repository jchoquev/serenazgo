import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Checkbox,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import {FaSearch} from 'react-icons/fa'
//import Select from 'react-select'

export default function TacticoModal({tactico,setTactico,dataTable,setData}){
    const [err, setErr] = useState({err:false,msg:""});
    const form=tactico.form;
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!tactico.update){
            axios.post(`${process.env.API_URL}sipcop/updates/tactico`, form).then(({data,status})=> {
                const {msg,ok}=data;
                ok&&setData(dataTable.map((item)=>{
                    if(item._id===msg._id) return {...item,Tactico:msg.Tactico};
                    return item;
                }));
                ok&&setTactico({...tactico,open:false})
            }).catch(_ => {
                setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
            });
        }else{
            axios.put(`${process.env.API_URL}sipcop/updates/tactico`, form).then(({data,status})=> {
                const {msg,ok}=data;
                ok&&setData(dataTable.map((item)=>{
                    if(item._id===msg._id) return msg;
                    return item;
                }));
                ok&&setTactico({...tactico,open:false})
            }).catch(_ => {
                setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
            });
        }
    }
    const fetchFindDireccion=(ubicacion)=>{
        const coordenadasRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        if(coordenadasRegex.test(form.Posicion)){
            const ubicacion={Latitud:Number(form.Posicion.split(',')[0]),Longitud:Number(form.Posicion.split(',')[1])};
            axios.get(`${process.env.API_URL}sipcop/tacticalpoints/direccion`,{params:ubicacion}).then(({data,status})=>{
                setTactico({...tactico,form:{...form,Direccion:data.msg.Direccion||""}})
            }).catch((e)=>{
                setErr({err:false,msg:"Ocurrio un error en buscar un punto tactico..."})
            });
        }
    }
    const handlePosicion=(e)=>{
        setTactico({...tactico,form:{...form,[e.target.name]:e.target.value.replace(/\s|°/g, "")}})
    }

    const handleChange=(e)=>{
        setTactico({...tactico,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleCheck=(name,value)=>{
        setTactico({...tactico,form:{...form,[name]:value}})
    }
    return <>
        <Modal show={tactico.open} size="sm" popup onClose={() => setTactico({...tactico,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    {form.Numero&&<div>
                        <div className="mb-1 block">
                            <Label value="Numero" />
                        </div>
                        <TextInput sizing="sm" type="number" value={form.Numero||""} name="Numero"  disabled/>
                    </div>}
                    {form.IdPlaca&&<div>
                        <div className="mb-1 block">
                            <Label value="Placa" />
                        </div>
                        <TextInput sizing="sm" name="Placa" value={form.IdPlaca||""} disabled/>
                    </div>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Posición" />
                        </div>
                        <div className="flex justify-between">
                            <TextInput sizing="sm" className="w-full" onChange={handlePosicion} name="Posicion" value={form.Posicion||""} placeholder="Ejemplo: -15.862978,-70.015716" required/>
                            <Button color="gray" size="sm" className='self-end ml-1' pill onClick={fetchFindDireccion}>
                                <FaSearch/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Dirección" />
                        </div>
                        <TextInput sizing="sm" name="Direccion" value={form.Direccion||""}  onChange={handleChange}required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Llego" />
                        </div>
                        <TextInput sizing="sm" type="time" name="HLlegada" value={form.HLlegada||""}   onChange={handleChange}step="1" required/>
                    </div>
                    {tactico.update&&<div>
                        <div className="mb-1 block">
                            <Label value="Se ira" />
                        </div>
                        <TextInput sizing="sm" type="time" name="HSeira" value={form.HSeira||""}  onChange={handleChange}step="1" required/>
                    </div>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Observacion" />
                        </div>
                        <TextInput sizing="sm" name="Observaciones" value={form.Observaciones||""} onChange={handleChange} />
                    </div>
                    {tactico.update&&<div>
                        <ToggleSwitch
                            checked={form.Completo}
                            label="Cumplio"
                            onChange={()=>{handleCheck('Completo',!form.Completo)}}
                        />
                    </div>}
                    <div>
                        <ToggleSwitch
                            checked={form.Revisar}
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
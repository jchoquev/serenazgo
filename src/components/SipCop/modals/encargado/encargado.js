import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Badge,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import {FaSearch} from 'react-icons/fa'
import Select from 'react-select'


function EncargadosModal({position,encargadoModal,setEncargadoModal,dataTable,setData}){
    const [err, setErr] = useState({err:false,msg:""});
    const form=encargadoModal.form;
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.API_URL}sipcop/updates/encargados`,form).then(({data,status})=> {
            const {msg,ok}=data;
            ok&&setData(dataTable.map((item)=>{
                if(item._id===msg._id) return msg;
                return item;
            }));
            ok&&encargadoModal({...odometroModal,open:false})
        }).catch((e) => {
            console.log(e)
            setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
        });
    }
    const handleChange=(e)=>{
        setEncargadoModal({...encargadoModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleCheck=(name,value)=>{
        setEncargadoModal({...encargadoModal,form:{...form,[name]:value}})
    }
    const handleSelect=(value)=>{
        setEncargadoModal({...encargadoModal,form:{...form,'Select2':value,Cargo:value.value}})
    }
    const handleFindDNI=()=>{
        axios.get(`${process.env.API_URL}sipcop/getfindstaff`,{params:{NDocumento:form.DNI}}).then(({data,status})=> {
            const {msg,ok}=data;
            if(msg){
                ok&&setEncargadoModal({...encargadoModal,form:{...form,
                    DNI:msg.NDocumento,
                    Nombres:msg.fullNombres,
                    NCelular:msg.NCelular,
                    Cargo:msg.Cargo.Cargo,
                    Select2:{value:msg.Cargo.Cargo,label:msg.Cargo.Cargo}
                }})
            }else{
                setErr({err:true,msg:"El DNI no se encuentra registrado."})
            }
        }).catch(_ => {
            setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
        });
    }
    return <>
        <Modal show={encargadoModal.open} size="sm" popup onClose={() => setEncargadoModal({...encargadoModal,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    <h3 className="font-bold uppercase text-green-900">encargado ( MOvil {form.Numero})</h3>
                    <div>
                        <div className="mb-1 block">
                            <Label value="DNI" />
                        </div>
                        <div className="flex justify-between">
                            <TextInput sizing="sm" className="w-full" name="DNI" minlength="8" onChange={handleChange} value={form.DNI||""} required/>
                            <Button color="gray" size="sm" className='self-end ml-1' pill  onClick={handleFindDNI}>
                                <FaSearch/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Apellidos y Nombres" />
                        </div>
                        <TextInput sizing="sm" name="Nombres" value={form.Nombres||""} onChange={handleChange} required/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Cargo" />
                        </div>
                        {<Select value={form.Select2} onChange={handleSelect} options={position.map((option)=>({value: option.Cargo, label:option.Cargo}))}  required/>}
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="# de celular"/>
                        </div>
                        <TextInput sizing="sm" name="NCelular" value={form.NCelular||""} onChange={handleChange} required/>
                    </div>  
                    <div>
                        <ToggleSwitch
                            checked={form.Conductor}
                            label="Conductor"
                            onChange={()=>{handleCheck('Conductor',!form.Conductor)}}
                        />
                    </div>               
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">{!encargadoModal.update?"GUARDAR":"ACTUALIZAR"}</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}
export default EncargadosModal;
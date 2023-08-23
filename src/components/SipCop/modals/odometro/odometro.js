import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Badge,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';


export default function OdometroModal({odometroModal,setOdometroModal,dataTable,setData}){
    const [err, setErr] = useState({err:false,msg:""});
    const form=odometroModal.form;
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put(`${process.env.API_URL}sipcop/updates/odometro`,form).then(({data,status})=> {
            const {msg,ok}=data;
            ok&&setData(dataTable.map((item)=>{
                if(item._id===msg._id) return msg;
                return item;
            }));
            ok&&setOdometroModal({...odometroModal,open:false})
        }).catch(_ => {
            setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
        });
    }
    const handleChange=(e)=>{
        setOdometroModal({...odometroModal,form:{...form,[e.target.name]:e.target.value}})
    }
    return <>
        <Modal show={odometroModal.open} size="sm" popup onClose={() => setOdometroModal({...odometroModal,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    <h3 className="font-bold uppercase text-green-900">Odometros ({form.Numero})</h3>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Odometro Inicial" />
                        </div>
                        <TextInput sizing="sm" type="number" name="OdometroInicial" value={form.OdometroInicial||""} onChange={handleChange} required/>
                    </div>  
                    <div>
                        <div className="mb-1 block">
                            <Label value="Odometro Final" />
                        </div>
                        <TextInput sizing="sm" type="number" name="OdometroFinal" value={form.OdometroFinal||"0"} onChange={handleChange} required/>
                    </div>                  
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">ACTUALIZAR</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}

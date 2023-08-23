import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Badge,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';


export default function KilometrajeModal({kmModal,setKmModal,dataTable,setData}){
    const [err, setErr] = useState({err:false,msg:""});
    const form=kmModal.form;
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put(`${process.env.API_URL}sipcop/updates/km`,{...form,inicial:kmModal.inicial}).then(({data,status})=> {
            const {msg,ok}=data;
            ok&&setData(dataTable.map((item)=>{
                if(item._id===msg._id) return msg;
                return item;
            }));
            ok&&setKmModal({...kmModal,open:false})
        }).catch(_ => {
            setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
        });
    }
    const handleChange=(e)=>{
        setKmModal({...kmModal,form:{...form,[e.target.name]:e.target.value}})
    }
    const handleCheck=(name,value)=>{
        setKmModal({...kmModal,form:{...form,[name]:value}})
    }
    return <>
        <Modal show={kmModal.open} size="sm" popup onClose={() => setKmModal({...kmModal,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    {kmModal.inicial?<h3 className="font-bold uppercase text-green-900">Kilometraje Inicial ({form.Numero})</h3>:<h3 className="text-red-900 font-bold uppercase ">Kilometraje Final ({form.Numero})</h3>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Kilometraje" />
                        </div>
                        <TextInput sizing="sm" disabled={form.vini} type="number" name="KM" value={form.KM||""} onChange={handleChange} required/>
                    </div>  
                    {form.vini&&(form.Nombres!="")&&<div className="text-justify">
                        <Badge color="success">
                            {form.Nombres}
                        </Badge>
                    </div>}                  
                    {!form.vini&&<div>
                        <ToggleSwitch
                            checked={form.Verificado}
                            label="Verificado"
                            onChange={()=>{handleCheck('Verificado',!form.Verificado)}}
                        />
                    </div>}
                    {!form.vini&&<div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">ACTUALIZAR</Button>
                    </div>}
                </form>
            </Modal.Body>
      </Modal>
    </>
}

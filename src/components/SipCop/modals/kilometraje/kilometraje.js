import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,ToggleSwitch,Badge,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import { useSelector,useDispatch } from "react-redux";
import { updOneModalKm } from "@/Redux/Slice/modalSlice";
/*
Nuevo
*/
import { updKilometraje } from "@/Redux/Slice/modalSlice";

export default function KilometrajeModal(){
    const {Km:{form,error,open}}= useSelector((state) => state.Modal)
    const List= useSelector((state) => state.SipCop.ListSipCops)
    const dispatch = useDispatch()
    const [err, setErr] = useState({err:false,msg:""});
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(updKilometraje(form,List))
        /*axios.put(`${process.env.API_URL}sipcop/updates/km`,{...form,inicial:kmModal.inicial}).then(({data,status})=> {
            const {msg,ok}=data;
            ok&&setData(dataTable.map((item)=>{
                if(item._id===msg._id) return msg;
                return item;
            }));
            ok&&setKmModal({...kmModal,open:false})
        }).catch(_ => {
            setErr({err:true,msg:"Error al Actualizar, intentelo mas tarde."})
        });*/
    }
    const handleChange=(e)=>{
        dispatch(updOneModalKm({key:'form',value:{...form,[e.target.name]:e.target.value}}))
    }
    const handleCheck=(name,value)=>{
        dispatch(updOneModalKm({key:'form',value:{...form,[name]:value}}))
    }
    return <>
        {form&&<Modal show={open} size="sm" popup onClose={() => dispatch(updOneModalKm({key:'open',value:false}))}>
            <Modal.Header className="space-y-1">
                <h3 className={"px-4 font-bold"}>
                    Kilometraje 
                    <Badge color="gray" className=""> Movil {form.Numero}</Badge>
                </h3>
            </Modal.Header>
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Inicial" />
                        </div>
                        <TextInput sizing="sm" disabled={form.Verificado2} type="number" name="Inicial" value={form.Inicial} onChange={handleChange} required/>
                    </div>   
                    <div>
                        <div className="mb-1 block">
                            <Label value="Final" />
                        </div>
                        <TextInput sizing="sm" disabled={form.Verificado2} type="number" name="Final" value={form.Final} onChange={handleChange} required/>
                    </div>
                    {!form.Verificado2&&<ToggleSwitch
                            checked={form.Verificado}
                            label="Verificado"
                            onChange={()=>{handleCheck('Verificado',!form.Verificado)}}
                    />}
                    <Button size="sm" className={`w-full ${(form.Verificado2)&&'hidden'}`} type="submit">ACTUALIZAR</Button>
                </form>
            </Modal.Body>
        </Modal>}
    </>
}

/*
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
*/
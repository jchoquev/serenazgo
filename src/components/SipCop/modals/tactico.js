import { useState,useEffect } from "react";
import axios from "axios";
import {Button,Modal,Alert,Table,Checkbox,Label,TextInput} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import Select from 'react-select'

export default function TacticoModal({tactico,setTactico}){
    const [err, setErr] = useState({err:false,msg:""});
    /*const [data,setData]=useState(null); 
    const fetchvhactivo= ()=>{
        axios.get(`${process.env.API_URL}vehiculos/activo`,{}).then(({data,status})=>{
            if(status===400) setData(null);
            setData(data.msg);
        }).catch((e)=>{
            setErr({err:false,msg:"Ocurrio un error en listar..."})
        });
    }

    useEffect(()=>{
        fetchvhactivo();
    },[])

    const handleCheck=(index,Activo)=>{
        data[index].Activo=Activo
        setData(data.map((item,i)=>{
            if (index===i) return {...item,Activo:Activo}
            return item;
        }))
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData=data.filter((item)=>(item.Activo===true));
        if(formData.length>0){
            axios.post(`${process.env.API_URL}sipcop/inserts/complete`, {add:formData,turno:User&&User.Grupo.Turno}).then(data=> {
                console.log(data)
                setOpenModal({...openModal,open:false});
                //fetchData();
                //alert("actualizado")
            }).catch((e) => { 
                setErr({err:true,msg:"Error al GUARDAR, intentelo mas tarde."})
            });
        }else{
            alert("No tiene nada que actualizar...")
        }
    }
    onSubmit={handleSubmit}
    */
    return <>
        <Modal show={tactico.open} size="sm" popup onClose={() => setTactico({...tactico,open:false})}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" >
                    {err.err&&<Alert color="failure" icon={HiInformationCircle}> {err.msg} </Alert>}
                    <div>
                        <div className="mb-1 block">
                            <Label value="Numero" />
                        </div>
                        <TextInput sizing="sm" type="number" name="Numero"  disabled/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Placa" />
                        </div>
                        <TextInput sizing="sm" name="Placa"  disabled/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Posición" />
                        </div>
                        <TextInput sizing="sm" name="Posicion" placeholder="Ejemplo: -15.862978,-70.015716" required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Dirección" />
                        </div>
                        <TextInput sizing="sm" name="Direccion"  disabled/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Llego" />
                        </div>
                        <TextInput sizing="sm" type="time" name="Llego"  step="1" required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Se ira" />
                        </div>
                        <TextInput sizing="sm" type="time" name="Seira"  step="1" required/>
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label value="Observacion" />
                        </div>
                        <TextInput sizing="sm" name="Observacion" />
                    </div>
                    <div className="w-full pt-1">
                        <Button size="sm" className="w-full" type="submit">AGREGAR</Button>
                    </div>
                </form>
            </Modal.Body>
      </Modal>
    </>
}//
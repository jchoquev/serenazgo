import {Button,Modal,Label,TextInput} from "flowbite-react";

import { useSelector,useDispatch } from "react-redux";
import { udpModalOdometro,fetchUpdOdometro } from "@/Redux/Slice/modalSlice";


export default function OdometroModal(){
    const {Odometro:{form,open}}= useSelector((state) => state.Modal)
    const List= useSelector((state) => state.SipCop.ListSipCops)
    const dispatch=useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(fetchUpdOdometro(form,List))
    }
    const handleChange=(e)=>{
        dispatch(udpModalOdometro({key:"form",value:{...form,[e.target.name]:e.target.value}}))
    }
    return <>
        {form&&<Modal show={open} size="sm" popup onClose={() => dispatch(udpModalOdometro({key:"open",value:false}))}>
            <Modal.Header />
            <Modal.Body>
                <form className="space-y-1" onSubmit={handleSubmit}>
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
      </Modal>}
    </>
}

/*
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
*/
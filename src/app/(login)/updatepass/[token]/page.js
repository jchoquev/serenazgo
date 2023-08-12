"use client"
import { useRouter } from "next/navigation";
import { Button, Label, TextInput } from 'flowbite-react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Toast } from 'flowbite-react';
import {BiSolidErrorCircle} from "react-icons/bi"
import { signOut } from "next-auth/react";
export default function UpdatePass({ params:{token} }){
    const [valid,setValid]=useState(false);
    const [err,setErr]=useState({state:false,msg:""})
    const router = useRouter();
    const fetchValid=()=>{
        axios.get(`${process.env.API_URL}auth/validate/findone/${token}`,{}).then(({data:{ok}})=>{
            if(!ok) router.push('/login');
            setValid(ok)
        }).catch(_=>{
            router.push('/login');
        });
    }
    useEffect(()=>{
        fetchValid();
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        const form=e.target.elements;
        if(form.nclave.value===form.rnclave.value){
            axios.put(`${process.env.API_URL}auth/validate`, {Password:form.nclave.value,oldPassword:form.aclave.value,token}).then(_=> {
                signOut();
                router.push('/login');
            }).catch(_ => {
                setErr({state:true,msg:"Los datos ingresados son incorrectos."});
            });
        }else{
            setErr({state:true,msg:"La contraseñas nuevas ingresadas son diferentes."});
        }
    }

    return <>
        {valid&&<div class="flex items-center justify-center h-screen w-screen">
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                    <Label value="Clave antigua" />
                    </div>
                    <TextInput  placeholder="Tu clave anterior" name="aclave" required  type="text"/>
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label value="Nueva clave" />
                    </div>
                    <TextInput  placeholder="Tu nueva clave de acceso"  name="nclave" required  type="password"/>
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label value="Repetir nueva clave" />
                    </div>
                    <TextInput  placeholder="Repite tu nueva clave de acceso" name="rnclave" required  type="password"/>
                </div>
                <Button type="submit">
                    Cambiar Clave
                </Button>
            </form> 
        </div>}
        {err.state&&<div className="fixed bottom-4 right-4">
            <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                    <BiSolidErrorCircle className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                    {err.msg}
                </div>
                <Toast.Toggle onClick={()=>{setErr(!err.state)}}/>
            </Toast>
        </div>}
    </>
}
"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Login(){
  const [error,setError]=useState(null);
  const router=useRouter();

  const handlSubmit=async (e)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget);
    try {
      const res=await signIn("credentials",{
        username:formData.get("User"),
        password:formData.get("Password"),
        redirect:false
      })
      if(res.error) return setError(res.error);
      if(res.ok) return router.push("/admin")
    } catch (_) {
      return setError("Intentelo mas tarde...");
    }

  }
    return (
        <div className="max-w-sm mx-auto flex flex-col justify-center items-center h-screen">
               <form className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md" onSubmit={handlSubmit}>
                  {error&&<div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Usuario:
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Tu usuario"
                      name="User"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Clave:
                    </label>
                    <input
                      type="password"
                      name="Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      placeholder="Tu clave"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-all"
                  >
                    Entrar
                  </button>
                  <a href="sms:920561696?body=Aquí el cuerpo del mensaje">Aquí el texto que quieras</a> 
                </form>
        </div>
     
      );
}
"use client"
import { useSession,signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
export default function admin(){
    const {session,status}=useSession();
    //console.log(session,status);
    return (
        <>
          <div class="flex flex-col relative w-screen">
              <Navbar/>   
          </div>   
          <div className="ml-60 w-full bg-red-50">
             
          </div>    
        </>
        
    );
}
/*
<div>Entraste
            <pre>
                {
                    JSON.stringify(
                        session,status
                    )
                }
            </pre>
        </div>
        <button onClick={()=>{signOut();}}>Cerrar</button>
*/
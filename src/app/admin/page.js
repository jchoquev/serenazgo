"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

export default function Admin(){
    const { data: session,status }=useSession();
    const route=useRouter();
    if (status === "loading") return <Loading/>;
    if (session.user.uPassword!=null) route.push(`/updatepass/${session.user.uPassword}`);
    return (
        <>
            <div className="flex flex-col relative w-screen">
            <Navbar User={session.user}/>
            </div>   
            <div className="w-full bg-red-50">
                {JSON.stringify(session.user)}
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
import NavbarAdmin from "./Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
export default function Template({Dynamic}){
    const { data: session,status }=useSession();
    const route=useRouter();
    if (status === "loading") return <Loading/>;
    if (session.user.uPassword!=null) route.push(`/updatepass/${session.user.uPassword}`);
    return <>
        <NavbarAdmin User={session.user}/>
        <div className='container mx-auto'>
            <Dynamic/>
        </div>
    </>;
}
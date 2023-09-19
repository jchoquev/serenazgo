import NavbarAdmin from "./Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import {Toast} from "flowbite-react";
import {HiCheck,HiX} from "react-icons/hi"
import { useSelector, useDispatch} from "react-redux";
import { delToast } from "@/Redux/Slice/toastSlice";
export default function Template({Dynamic}){
    const { data: session,status }=useSession();
    const {List}= useSelector((state) => state.Toast)
    const dispatch=useDispatch();
    const route=useRouter();
    if (status === "loading") return <Loading/>;
    if (session&&session.user&&session.user.uPassword!=null) route.push(`/updatepass/${session.user.uPassword}`);
    return <>
        <NavbarAdmin User={session&&session.user}/>
        <div className='container mx-auto'>
            <Dynamic/>
        </div>
        {List&&<div className="flex flex-col gap-1 bottom-0 right-0 fixed z-auto">
            {List.map((item,index)=>(
                <Toast key={item.key}>
                    {item.state?<div  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" onClick={()=>dispatch(delToast(item.key))}/>
                    </div>:
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" onClick={()=>dispatch(delToast(item.key))}/>
                    </div>}
                    <div className="ml-3  font-normal">
                        <p className="text-sm">{item.message}<br /><span className="text-xs italic">{item.hora}</span></p> 
                    </div>
                    <Toast.Toggle onClick={()=>dispatch(delToast(item.key))}/>
                </Toast>
            ))}
        </div>}
    </>;
}
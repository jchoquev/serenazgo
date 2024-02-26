import {MdPlaylistAddCircle,MdEditSquare,MdDelete} from 'react-icons/md'
import { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
export default function Asistencia({session,status}) {
    const list= useSelector((state) => state.Lists)
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log(list)
    },[])
    return <>
        <div className="relative w-full">
            <button className="absolute top-0 right-0 z-10 pr-1 pt-1" onClick={()=>{setOpenModal({open:true,update:false,form:form})}}>
                <MdPlaylistAddCircle className="w-8 h-8 text-green-600 hover:text-emerald-900 bg-white rounded-full p-1 border border-x-emerald-700"/>
            </button>
            {JSON.stringify(session)}
            {JSON.stringify(session.Grupo)}
        </div>
    </>
}

//<ShiftTable className="z-0" Data={Data} fetchData={fetchData} setOpenModal={setOpenModal}/>

import {Button,Modal,Table,Checkbox} from "flowbite-react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { udpReporte } from "@/Redux/Slice/modalSlice";
export default function ReporteModal({User}){
    const {Reporte:{form,open}}= useSelector((state) => state.Modal)
    const {ListSipCops:List} = useSelector((state) => state.SipCop)
    const dispatch=useDispatch()
    return <>
        {<Modal show={open} size="lg" popup onClose={() => dispatch(udpReporte({key:"open",value:false}))}>
            <Modal.Header>
                <h3 className="font-bold uppercase text-green-900 ml-4">Reporte</h3>
            </Modal.Header>
            <Modal.Body>
                <table>
                    <tr>
                        <td>Extracto </td>
                        <td>{moment(User.fSession).format("DD/MM/YYYY")}</td>
                        <td colSpan={3}>A.-M.-T.</td>
                    </tr>
                    <tr>
                        <td>NRO P</td>
                        <td>PLACA</td>
                        <td>A.-M.-T.</td>
                    </tr>
                </table>
                {JSON.stringify()}
            </Modal.Body>
        </Modal>}
    </>
}
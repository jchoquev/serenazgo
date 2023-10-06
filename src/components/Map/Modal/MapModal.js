import { useSelector,useDispatch } from "react-redux";
import { updModalPoints } from "@/Redux/Slice/mapsSlice";
import { Button, Modal } from 'flowbite-react';
import DynamicMap from "../PuntosMapa/LoadMap";
export default function MapPointModal(){
    const {ModalPoints:{List,open}}= useSelector((state) => state.Maps)
    const dispatch=useDispatch();
    return <>
        <Modal size={"4xl"} show={open} onClose={() => dispatch(updModalPoints({key:"open",value:false}))}>
            <Modal.Header>
                Terms of Service
            </Modal.Header>
            <Modal.Body className="m-0 p-0">
                <DynamicMap/>
            </Modal.Body>
        </Modal>
    </>
}
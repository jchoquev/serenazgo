import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup,Tooltip,Circle } from 'react-leaflet';
import { useSelector,useDispatch } from "react-redux";
import { fetchAllTactico } from '@/Redux/Slice/listSlice';
import L from 'leaflet';


export default function Map() {
  const {TacticalPoints}= useSelector((state) => state.Lists)
  const dispatch=useDispatch()
  const [geoData, setGeoData] = useState({ lat: -16.566395, lng: -69.038504 });

  const center = [geoData.lat, geoData.lng];
  const fillBlueOptions = { color: 'blue' }
  useEffect(()=>{
    dispatch(fetchAllTactico());
    console.log(TacticalPoints)
  },[])
  if (TacticalPoints.length<=0) return <></>;
  return (
    <>
      <MapContainer center={center} zoom={14} minZoom={12} style={{ height: '70vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          TacticalPoints.map((item)=>{
            const {_id,Latitud,Longitud,Direccion}=item
            return <>
              <Circle key={_id} center={[Latitud, Longitud]} pathOptions={fillBlueOptions} radius={150}>
                <Popup>{Direccion}</Popup>
              </Circle>
            </>
          })
        }
      </MapContainer>
    </>
  );
}
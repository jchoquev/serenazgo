import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup,Tooltip } from 'react-leaflet';
import { useSelector,useDispatch } from "react-redux";
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';

export default function Map() {
  const {ModalPoints:{List}}= useSelector((state) => state.Maps)
  const [geoData, setGeoData] = useState({ lat: -16.566395, lng: -69.038504 });


  const center = [geoData.lat, geoData.lng];
  return (
    <MapContainer center={center} zoom={14} minZoom={12} style={{ height: '60vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        List&&List.map((item,key)=>{
          const {Coordenadas,IPopup,ITooltip}=item;
          return <Marker key={key} icon={myIcon} position={[Coordenadas.Latitud, Coordenadas.Longitud]}>
            <Popup>
              <div dangerouslySetInnerHTML={{ __html: IPopup }} />
            </Popup>
            <Tooltip>
              {ITooltip}
            </Tooltip>
          </Marker>
        })
      }
    </MapContainer>
  );
}

const url="https://api.iconify.design/bxs/map.svg?color=%23ff2f27";
const myIcon = new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    popupAnchor:  [-0, -0],
    iconSize: [35,48],  
});
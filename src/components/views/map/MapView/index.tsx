import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

export default function MapView(){

    const newIcon = new Icon({
        iconUrl: "/marker.svg",
        iconSize: [40, 40],
    })

    return (
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ width: "400px", height: "400px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={newIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
}
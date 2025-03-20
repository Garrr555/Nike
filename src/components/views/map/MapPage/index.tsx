import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const newIcon = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [40, 40],
  });

  return (
    <div className="container flex justify-center pb-10 ">
      <div className="w-full border-2 border-accent overflow-hidden rounded-xl">
        <MapContainer
          center={[-7.5383336, 109.1365494]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100vh", margin: "5px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-7.5383336, 109.1365494]} icon={newIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

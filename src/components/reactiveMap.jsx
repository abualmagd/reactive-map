import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ReactiveMap() {
  return (
    <div className=" cotainer">
      <MapContainer
        center={[30.0444, 31.2358]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">openstream</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[30.0444, 31.2358]}>
          <Popup>
            Go to <br />{" "}
            <a href="https://ismail-chu.pages.dev/" target="_blank">
              ismail site
            </a>
            .
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

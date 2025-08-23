import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { SchoolContext } from "../context/school";
import L from "leaflet";

export default function ReactiveMap() {
  const { schools } = useContext(SchoolContext);

  const createClassBasedIcon = (schola) => {
    return L.divIcon({
      className: `marker-icon sector-${schola.sectorId}`,
      iconSize: [15, 15],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
    });
  };

  const saCenter = [23.496310871525523, 44.98354801038431];
  return (
    <div className=" h-full w-full  container">
      <MapContainer
        center={saCenter}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
        zoom={6.2}
        zoomControl={true}
        dragging={true}
        doubleClickZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">openstream</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {schools.map((schola, index) => {
          return (
            <Marker
              key={index}
              position={[schola.latitude, schola.longitude]}
              icon={createClassBasedIcon(schola)}
            >
              <Popup>
                <PopDiv schola={schola} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

const PopDiv = ({ schola }) => {
  return (
    <div
      key={schola.id}
      className=" w-72  rounded-md bg-white flex flex-col gap-3 text-start"
    >
      <div className=" w-full flex flex-col gap-2">
        <div className=" font-bold">{schola.name}</div>
        <div>{schola.quarter}</div>
        <div>
          {" "}
          <span>التجمع الصحي:</span> <span>{schola.sector}</span>
        </div>
      </div>

      <div className="lista flex gap-3">
        <div className="oval border rounded-xl px-2 py-1">{schola.gender}</div>
        <div className="oval border rounded-xl px-2 py-1">{schola.stage}</div>
        <div className="oval border rounded-xl px-2 py-1">{schola.type}</div>
      </div>

      <div className="divider border-b-2 my-1 h-2 w-full mx-1"></div>

      <div className=" w-full flex flex-col gap-2">
        <div className=" font-bold">
          <span> المدير:</span> <span>{schola.manager}</span>{" "}
        </div>
        <div className=" ">
          <span> المشرف:</span> <span>{schola.supervisor || ""}</span>{" "}
        </div>
        <div className="">
          <span> الموجه:</span> <span>{schola.director || ""}</span>{" "}
        </div>
        <div>
          <span>جوال المدير: </span>{" "}
          <a
            href={`https://wa.me/${schola.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {schola.phone}
          </a>
        </div>
        <div>
          <span>جوال الموجه: </span>{" "}
          <a
            href={`https://wa.me/${schola.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {schola.dphone || ""}
          </a>
        </div>
        <div>
          {" "}
          <span> البريد:</span>{" "}
          <a href={`mailto:${schola.email}`}>{schola.email}</a>
        </div>
        <div className="flex gap-5">
          <div>
            <span>خط طول:</span> <span>{schola.longitude}</span>
          </div>
          <div>
            <span>خط عرض:</span> <span>{schola.latitude}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

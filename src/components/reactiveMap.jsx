import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { SchoolContext } from "../context/school";
import L from "leaflet";

export default function ReactiveMap() {
  const { schools } = useContext(SchoolContext);

  const memoizedSchools = useMemo(() => schools, [schools]);

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
        {memoizedSchools.slice(0, 100).map((schola, index) => {
          return (
            <Marker
              key={index}
              position={[schola.latitude, schola.longitude]}
              icon={createClassBasedIcon(schola)}
              eventHandlers={{
                // Only create popup when marker is clicked
                click: (e) => {
                  e.target.openPopup();
                },
              }}
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

const PopDiv = React.memo(({ schola }) => {
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
            href={`https://wa.me/${schola.dphone}`}
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
});

// Component to handle viewport-based marker rendering
const DynamicMarkers = ({ schools }) => {
  const map = useMap();
  const [bounds, setBounds] = useState(map.getBounds());
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const updateBounds = () => {
      setBounds(map.getBounds());
      setZoom(map.getZoom());
    };

    map.on("moveend", updateBounds);
    map.on("zoomend", updateBounds);

    return () => {
      map.off("moveend", updateBounds);
      map.off("zoomend", updateBounds);
    };
  }, [map]);

  // Filter markers based on current viewport and zoom level
  const visibleSchools = useMemo(() => {
    // At higher zoom levels, show all markers in viewport
    if (zoom >= 10) {
      return schools.filter((school) =>
        bounds.contains([school.latitude, school.longitude])
      );
    }

    // At lower zoom levels, show a subset of markers (sampling)
    const sampleRate = Math.max(1, Math.floor(schools.length / 300));
    return schools.filter(
      (school, index) =>
        index % sampleRate === 0 &&
        bounds.contains([school.latitude, school.longitude])
    );
  }, [schools, bounds, zoom]);

  const createCustomIcon = (schola) => {
    // Generate a color based on sectorId or use a default
    const color = `hsl(${(schola.sectorId * 137) % 360}, 70%, 50%)`;

    return L.divIcon({
      html: `
      <div style="
        position: relative;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 0.5px solid black;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid white;
          background: ${color};
        "></div>
      </div>
    `,
      className: "custom-marker-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  };
  return (
    <>
      {visibleSchools.map((schola, index) => {
        return (
          <Marker
            key={`${schola.id}-${index}`}
            position={[schola.latitude, schola.longitude]}
            icon={createCustomIcon(schola)}
          >
            <Popup>
              <PopDiv schola={schola} />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

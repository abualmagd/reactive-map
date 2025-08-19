import { GeoJSON, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { sectors } from "../data";

//https://geojson.io/
//geojson generation website
export default function SectorsMap() {
  const [hoveredSection, setHoveredSection] = useState(null);

  const egyptCenter = [26.8206, 30.8025];

  const sectionStyle = (section) => {
    return {
      fillColor: hoveredSection === section.id ? "#fdf902ff" : "#ffffff",
      weight: 2,
      color: "#221010ff",
      fillOpacity: 0.9,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
      className: "section-polygon",
    };
  };

  return (
    <div className=" cotainer relative z-0">
      <MapContainer
        center={egyptCenter}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">openstream</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sectors.map((sector) => (
          <GeoJSON
            key={sector.id}
            data={sector.geometry}
            style={() => sectionStyle(sector)}
            eventHandlers={{
              click: () => alert(sector.id),
              mouseover: () => setHoveredSection(sector.id),
              mouseout: () => setHoveredSection(null),
            }}
          >
            <Tooltip direction="center" permanent className="my-tooltip">
              <span className="section-label">{sector.properties.name}</span>
              <div className=" w-8 h-8">
                <svg
                  fill={hoveredSection === sector.id ? "#211edc " : "#fdf902ff"}
                  viewBox="0 0 56 56"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 18.6483 41.0547 C 18.0858 40.6328 17.9921 39.9531 18.3202 38.9922 L 21.1796 30.4375 L 13.8671 25.2109 C 13.0234 24.6250 12.7187 23.9688 12.9062 23.3125 C 13.1171 22.6797 13.7733 22.3516 14.7812 22.3516 L 23.7812 22.4219 L 26.5234 13.8203 C 26.8046 12.8594 27.2968 12.3437 27.9999 12.3437 C 28.7030 12.3437 29.1718 12.8594 29.4765 13.8203 L 32.2187 22.4219 L 41.1952 22.3516 C 42.2265 22.3516 42.8358 22.6797 43.0702 23.3125 C 43.3046 23.9688 42.9530 24.6250 42.1327 25.2109 L 34.7968 30.4375 L 37.6562 38.9922 C 37.9843 39.9531 37.8905 40.6328 37.3514 41.0547 C 36.7655 41.5000 36.0858 41.3359 35.2655 40.7266 L 27.9999 35.4063 L 20.7343 40.7266 C 19.8905 41.3359 19.2109 41.5000 18.6483 41.0547 Z"></path>
                  </g>
                </svg>
              </div>
            </Tooltip>
          </GeoJSON>
        ))}
      </MapContainer>
    </div>
  );
}

import { GeoJSON, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { sections } from "../data";

//https://geojson.io/
//geojson generation website
export default function PartsMap() {
  const [hoveredSection, setHoveredSection] = useState(null);

  const egyptCenter = [26.8206, 30.8025];

  const sectionStyle = (section) => {
    return {
      fillColor: hoveredSection === section.id ? "#fdf902ff" : "#ffffff",
      weight: 1,
      color: "#ffffff",
      fillOpacity: 0.7,
      className: "section-polygon",
    };
  };

  return (
    <div className=" cotainer ">
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

        {sections.map((section) => (
          <GeoJSON
            key={section.id}
            data={section.geoJson}
            style={() => sectionStyle(section)}
            eventHandlers={{
              click: () => alert(section.id),
              mouseover: () => setHoveredSection(section.id),
              mouseout: () => setHoveredSection(null),
            }}
          >
            <Tooltip direction="center" permanent className="my-tooltip">
              <span className="section-label">{section.name}</span>
              <div>*</div>
            </Tooltip>
          </GeoJSON>
        ))}
      </MapContainer>
    </div>
  );
}

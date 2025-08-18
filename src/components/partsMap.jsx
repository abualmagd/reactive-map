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
      fillColor:
        hoveredSection === section.id
          ? `${section.color}aa`
          : `${section.color}77`,
      weight: 1,
      color: "#ffffff",
      fillOpacity: 0.7,
      className: "section-polygon",
    };
  };

  return (
    <div className=" cotainer">
      <MapContainer
        center={egyptCenter}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
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
            }}
          >
            <Tooltip direction="center" permanent>
              <span className="section-label">{section.name}</span>
            </Tooltip>
          </GeoJSON>
        ))}
      </MapContainer>
    </div>
  );
}

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  if (!results.length) {
    // If someone visits /map directly without uploading
    navigate("/");
    return null;
  }

  const getMarkerColor = (score) => {
    if (score > 0.75) return "red";
    if (score > 0.4) return "yellow";
    return "green";
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {results.map((item, idx) => {
        const color = getMarkerColor(item.Suspicion_Score);
        const icon = L.icon({
          iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        });
        return (
          <Marker key={idx} position={[item.latitude, item.longitude]} icon={icon}>
            <Popup>
              <strong>IP:</strong> {item.ip} <br />
              <strong>Prediction:</strong> {item.Prediction} <br />
              <strong>Score:</strong> {item.Suspicion_Score} <br />
              <strong>Location:</strong> {item.location}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapPage;

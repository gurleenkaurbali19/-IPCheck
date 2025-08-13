import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/mapPage.css";

// Legend component to add a legend control to the map
function Legend() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      const grades = ["High Suspicion", "Medium Suspicion", "Low Suspicion"];
      const colors = ["red", "yellow", "green"];

      let labels = [];

      for (let i = 0; i < grades.length; i++) {
        labels.push(
          `<i style="background:${colors[i]}; width: 18px; height: 18px; display:inline-block; margin-right:8px; border-radius:3px;"></i> ${grades[i]}`
        );
      }

      div.innerHTML = "<h4>Legend</h4>" + labels.join("<br>");
      return div;
    };

    legend.addTo(map);

    // Cleanup function to remove legend on unmount
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  // Redirect to home if no results provided
  useEffect(() => {
    if (!results.length) {
      navigate("/");
    }
  }, [results, navigate]);

  // Filter state for toggling suspicion levels
  const [filters, setFilters] = useState({
    red: true,
    yellow: true,
    green: true,
  });

  const toggleFilter = (color) => {
    setFilters((prev) => ({ ...prev, [color]: !prev[color] }));
  };

  // Determine marker color based on suspicion score
  const getMarkerColor = (score) => {
    if (score > 0.75) return "red";
    if (score > 0.4) return "yellow";
    return "green";
  };

  // Filter results based on current filters
  const filteredResults = results.filter((item) => {
    const color = getMarkerColor(item.Suspicion_Score);
    return filters[color];
  });

  // Marker with popup that shows on hover
  const HoverMarker = ({ position, icon, children }) => {
    const markerRef = useRef(null);

    useEffect(() => {
      const marker = markerRef.current;
      if (!marker) return;

      const onMouseOver = () => marker.openPopup();
      const onMouseOut = () => marker.closePopup();

      marker.on("mouseover", onMouseOver);
      marker.on("mouseout", onMouseOut);

      return () => {
        marker.off("mouseover", onMouseOver);
        marker.off("mouseout", onMouseOut);
      };
    }, []);

    return (
      <Marker position={position} icon={icon} ref={markerRef}>
        <Popup closeButton={false} autoClose={false} closeOnClick={false}>
          {children}
        </Popup>
      </Marker>
    );
  };

  // Bounds for the world map to restrict panning
  const worldBounds = [
    [-90, -180],
    [90, 180],
  ];

  return (
    <>
      {/* Filter controls above the map */}
      <div
        className="filter-controls"
        style={{
          padding: "8px",
          background: "#222",
          color: "#eee",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          fontSize: "1rem",
          userSelect: "none",
        }}
      >
        <label style={{ color: "red", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={filters.red}
            onChange={() => toggleFilter("red")}
            style={{ marginRight: 6 }}
          />
          High Suspicion
        </label>
        <label style={{ color: "yellow", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={filters.yellow}
            onChange={() => toggleFilter("yellow")}
            style={{ marginRight: 6 }}
          />
          Medium Suspicion
        </label>
        <label style={{ color: "limegreen", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={filters.green}
            onChange={() => toggleFilter("green")}
            style={{ marginRight: 6 }}
          />
          Low Suspicion
        </label>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={8}
        maxBounds={worldBounds}
        maxBoundsViscosity={0.7}
        style={{ height: "100vh", width: "100%" }}
        scrollWheelZoom={true}
      >
        {/* Dark themed tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
        />

        {/* Render filtered markers */}
        {filteredResults.map((item, idx) => {
          const color = getMarkerColor(item.Suspicion_Score);
          const icon = L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
            shadowSize: [41, 41],
          });

          return (
            <HoverMarker
              key={idx}
              position={[item.latitude, item.longitude]}
              icon={icon}
            >
              <div>
                <div>
                  <strong>IP:</strong> {item.ip}
                </div>
                <div>
                  <strong>Prediction:</strong> {item.Prediction}
                </div>
                <div>
                  <strong>Suspicion Score:</strong> {item.Suspicion_Score}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    marginTop: "6px",
                    fontSize: "0.85rem",
                    color: "#aabbee",
                  }}
                >
                  The suspicion score indicates how suspicious the IP is, from 0
                  (low) to 1 (high).
                </div>
                <div>
                  <strong>Location:</strong> {item.location}
                </div>
              </div>
            </HoverMarker>
          );
        })}

        {/* Adding the Legend to the map */}
        <Legend />
      </MapContainer>
    </>
  );
}

export default MapPage;

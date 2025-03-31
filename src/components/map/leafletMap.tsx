import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LeafletMap = ({
  coordinates,
}: {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}) => {
  return (
    <MapContainer
      center={[coordinates.latitude, coordinates.longitude]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[coordinates.latitude, coordinates.longitude]}
        icon={icon}
      >
        <Popup>Your approximate location based on IP</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;

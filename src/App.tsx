import { useQuery } from "@tanstack/react-query";
import LeafletMap from "./components/map/leafletMap";
import { useState } from "react";
import IpAddressForm from "./components/map/ipAddressForm";

const getMapData = async (ipAddress: string) => {
  const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
  const data = await response.json();
  // Add error handling
  if (data.error) {
    throw new Error(data.reason || "Failed to fetch location data");
  }
  const { latitude, longitude } = data;
  return { latitude, longitude };
};

// Default coordinates (Cairo, Egypt as fallback)
const DEFAULT_COORDS = {
  latitude: 30.0444,
  longitude: 31.2357,
};

const App = () => {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const handleMapData = () => {
    if (ipAddress) {
      return getMapData(ipAddress);
    }

    return new Promise<{ latitude: number; longitude: number }>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          resolve(DEFAULT_COORDS);
        }
      );
    });
  };
  const { data, isLoading, error, refetch } = useQuery(
    ["mapData", ipAddress], // Include ipAddress in the query key
    handleMapData,
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        Error: {(error as Error).message}
      </div>
    );
  }

  const handleSubmitIpAddress = (ip: string) => {
    setIpAddress(ip);
    refetch();
  };
  return (
    <main className="h-screen relative">
      <LeafletMap coordinates={data || DEFAULT_COORDS} />
      <IpAddressForm
        ipAddress={ipAddress}
        handleSubmitIpAddress={handleSubmitIpAddress}
      />
    </main>
  );
};

export default App;

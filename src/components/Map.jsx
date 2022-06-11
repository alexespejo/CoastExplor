import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const Map = ({ lati, long }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA6A1RdnZDqUhXOv4cHnEjQQWWsW5i2Nrw",
  });

  if (!isLoaded) return <div>loading</div>;
  return (
    <div className="mb-2 shadow-md">
      <Maps lat={lati} long={long} />
    </div>
  );
};

function Maps({ lat, long }) {
  const center = useMemo(() => ({ lat: lat, lng: long }), [lat, long]);

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="w-full h-56 rounded"
    >
      {" "}
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Map;

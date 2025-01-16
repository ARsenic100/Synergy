// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { ResourceLocation } from '../../types/resourceAllocation';

// interface ResourceAllocationMapProps {
//   locations: ResourceLocation[];
//   onMarkerClick: (location: ResourceLocation) => void;
// }

// export function ResourceAllocationMap({
//   locations,
//   onMarkerClick,
// }: ResourceAllocationMapProps) {
//   const getMarkerIcon = (status: ResourceLocation['status']) => {
//     const color =
//       status === 'delivered'
//         ? 'green'
//         : status === 'in-transit'
//         ? 'blue'
//         : status === 'allocated'
//         ? 'orange'
//         : 'red';

//     return new Icon({
//       iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-semibold mb-4">Resource Allocation Map</h2>
//       <div className="h-[600px] rounded-lg overflow-hidden">
//         <MapContainer
//           center={[20.5937, 78.9629]} // Center of India
//           zoom={5}
//           className="h-full w-full"
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {locations.map((location) => (
//             <Marker
//               key={location.id}
//               position={[location.lat, location.lng]}
//               icon={getMarkerIcon(location.status)}
//               eventHandlers={{
//                 click: () => onMarkerClick(location),
//               }}
//             >
//               <Popup>
//                 <div className="p-2">
//                   <h3 className="font-semibold">{location.schoolName}</h3>
//                   <p className="text-sm text-gray-600">
//                     Resource: {location.resourceType}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Quantity: {location.quantity}
//                   </p>
//                   <p
//                     className={`text-sm font-medium ${
//                       location.status === 'delivered'
//                         ? 'text-green-600'
//                         : location.status === 'in-transit'
//                         ? 'text-blue-600'
//                         : location.status === 'allocated'
//                         ? 'text-orange-600'
//                         : 'text-red-600'
//                     }`}
//                   >
//                     Status: {location.status}
//                   </p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ResourceLocation } from "../../types/resourceAllocation";

interface ResourceAllocationMapProps {
  onMarkerClick: (location: ResourceLocation) => void;
}

export function ResourceAllocationMap({
  onMarkerClick,
}: ResourceAllocationMapProps) {
  const [locations, setLocations] = useState<ResourceLocation[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://synergy-backend-six.vercel.app/api/resource-plans/resourcemap"
        );
        console.log("locations", response.data);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching resource locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const getMarkerIcon = (status: ResourceLocation["status"]) => {
    const color =
      status === "delivered"
        ? "green"
        : status === "pending"
        ? "blue"
        : status === "approved"
        ? "green"
        : "red";

    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Resource Allocation Map</h2>
      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => (
            // console.log(location);
            <Marker
              key={`${location.id}-${location.lat}-${location.lng}`}
              position={[location.lat, location.lng]}
              icon={getMarkerIcon(location.status)}
              eventHandlers={{
                click: () => onMarkerClick(location),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{location.schoolName}</h3>
                  <p className="text-sm text-gray-600">
                    Resource: {location.resourceType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {location.quantity}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      location.status === "delivered"
                        ? "text-green-600"
                        : location.status === "in-transit"
                        ? "text-blue-600"
                        : location.status === "allocated"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {location.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

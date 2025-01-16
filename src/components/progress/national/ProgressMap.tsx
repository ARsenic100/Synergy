import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { StateProgress } from '../../../types/progress';
import 'leaflet/dist/leaflet.css';

interface ProgressMapProps {
  stateProgress: StateProgress[];
}

export function ProgressMap({ stateProgress }: ProgressMapProps) {
  const getMarkerIcon = (status: StateProgress['status']) => {
    const color = status === 'completed' ? 'green' : 
                 status === 'in-progress' ? 'orange' : 'red';
                 
    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  return (
    <div className="h-[400px] w-full">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stateProgress.map((state) => (
          <Marker
            key={state.name}
            position={state.coordinates}
            icon={getMarkerIcon(state.status)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg mb-2">{state.name}</h3>
                <div className="space-y-1">
                  <p>Progress: {state.progress}%</p>
                  <p>Total Schools: {state.schools.toLocaleString()}</p>
                  <p className="capitalize">Status: {state.status.replace('-', ' ')}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
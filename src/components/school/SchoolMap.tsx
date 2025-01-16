import React from 'react';
import { School } from '../../types/school';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Building2, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SchoolMapProps {
  schools: School[];
  loading: boolean;
  center?: [number, number];
  zoom?: number;
}

export function SchoolMap({
  schools,
  loading,
  center = [20.5937, 78.9629],
  zoom = 5,
}: SchoolMapProps) {
  const getMarkerIcon = (structure: string) => {
    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${
        structure.toLowerCase().includes('odd') ? 'red' : 'green'
      }.png`,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md h-[600px] animate-pulse" />
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-[600px] rounded-lg"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {schools.map((school) => (
          <Marker
            key={school.id}
            position={[school.coordinates.lat, school.coordinates.lng]}
            icon={getMarkerIcon(school.currentStructure)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg mb-2">{school.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{school.currentStructure}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {school.studentCount} Students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {school.teacherCount} Teachers
                    </span>
                  </div>
                </div>
                <Link
                  to={`/schools/${school.id}`}
                  className="mt-4 block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

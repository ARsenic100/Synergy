import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface StateData {
  name: string;
  progress: number;
  schools: number;
  status: 'completed' | 'in-progress' | 'not-started';
  coordinates: [number, number]; // Latitude, Longitude
}

const mockStateData: StateData[] = [
  {
    name: 'Kerala',
    progress: 85,
    schools: 12500,
    status: 'completed',
    coordinates: [10.8505, 76.2711],
  },
  {
    name: 'Tamil Nadu',
    progress: 65,
    schools: 15000,
    status: 'in-progress',
    coordinates: [11.1271, 78.6569],
  },
  {
    name: 'Karnataka',
    progress: 45,
    schools: 13000,
    status: 'in-progress',
    coordinates: [15.3173, 75.7139],
  },
  {
    name: 'Maharashtra',
    progress: 75,
    schools: 20000,
    status: 'completed',
    coordinates: [19.7515, 75.7139],
  },
  {
    name: 'Rajasthan',
    progress: 30,
    schools: 16000,
    status: 'not-started',
    coordinates: [27.0238, 74.2179],
  },
  {
    name: 'Punjab',
    progress: 90,
    schools: 11000,
    status: 'completed',
    coordinates: [31.1471, 75.3412],
  },
  {
    name: 'Haryana',
    progress: 70,
    schools: 9000,
    status: 'completed',
    coordinates: [29.0588, 76.0856],
  },
  {
    name: 'West Bengal',
    progress: 55,
    schools: 17000,
    status: 'in-progress',
    coordinates: [22.9868, 87.855],
  },
  {
    name: 'Odisha',
    progress: 60,
    schools: 14000,
    status: 'in-progress',
    coordinates: [20.9517, 85.0985],
  },
  {
    name: 'Chhattisgarh',
    progress: 25,
    schools: 12000,
    status: 'not-started',
    coordinates: [21.2787, 81.8661],
  },
];
export function ProgressMap() {
  const [activeState, setActiveState] = useState<StateData | null>(null);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            National Progress Tracker
          </h2>
          <p className="text-lg text-gray-600">
            Track the standardization progress across different states
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map Visualization */}
          <div className="relative aspect-[4/5] bg-white rounded-xl shadow-lg p-4">
            <div className="absolute inset-0 bg-contain bg-center bg-no-repeat">
              <MapContainer
                center={[20.5937, 78.9629]} // Center of India
                zoom={5}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {mockStateData.map((state) => (
                  <Marker
                    key={state.name}
                    position={state.coordinates}
                    eventHandlers={{
                      click: () => setActiveState(state),
                    }}
                  >
                    <Popup>
                      <h3 className="font-bold">{state.name}</h3>
                      <p>Progress: {state.progress}%</p>
                      <p>Schools: {state.schools.toLocaleString()}</p>
                      <div
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          state.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : state.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {state.status.replace('-', ' ')}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Interactive elements would go here */}
            <div className="relative h-full">
              {activeState && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200"
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {activeState.name}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Progress: {activeState.progress}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Schools: {activeState.schools.toLocaleString()}
                    </p>
                    <div
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        activeState.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : activeState.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {activeState.status.replace('-', ' ')}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Stats and Legend */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {mockStateData.map((state) => (
                <motion.button
                  key={state.name}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveState(state)}
                  className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-left hover:border-indigo-500 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{state.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${state.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {state.progress}% Complete
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold mb-4">Status Legend</h3>
              <div className="space-y-2">
                {['completed', 'in-progress', 'pending'].map((status) => (
                  <div key={status} className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        status === 'completed'
                          ? 'bg-green-500'
                          : status === 'in-progress'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm text-gray-600 capitalize">
                      {status.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

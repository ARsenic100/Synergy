import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Wifi,
  Users,
  Droplets,
  Lightbulb,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

interface IoTMetric {
  timestamp: string;
  value: number;
  threshold?: number;
}

interface IoTAlert {
  id: string;
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

const mockRealTimeData = {
  classroomOccupancy: Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${i}:00`,
    value: Math.floor(Math.random() * 40) + 20,
    threshold: 45,
  })),
  waterUsage: Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${i}:00`,
    value: Math.floor(Math.random() * 1000) + 500,
    threshold: 1200,
  })),
  energyConsumption: Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${i}:00`,
    value: Math.floor(Math.random() * 50) + 30,
    threshold: 75,
  })),
};

const mockAlerts: IoTAlert[] = [
  {
    id: '1',
    type: 'Occupancy',
    message: 'Computer Lab exceeding maximum capacity',
    severity: 'high',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'Water Usage',
    message: 'Unusual water consumption in Block B',
    severity: 'medium',
    timestamp: new Date().toISOString(),
  },
];

export function IoTMonitoringDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<
    'occupancy' | 'water' | 'energy'
  >('occupancy');
  const [alerts, setAlerts] = useState<IoTAlert[]>(mockAlerts);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        const newData = {
          timestamp: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 40) + 20,
          threshold: 45,
        };
        // Update data here
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">IoT Resource Monitoring</h2>
          <p className="text-gray-600">
            Real-time resource utilization metrics
          </p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <RefreshCw className={`h-4 w-4 ${isLive ? 'animate-spin' : ''}`} />
          {isLive ? 'Live Updates' : 'Paused'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Classroom Occupancy</h3>
              <p className="text-sm text-gray-600">Current Average</p>
            </div>
          </div>
          <p className="text-2xl font-bold">32 students</p>
          <div className="mt-2 text-sm text-green-600">↑ 5% from last hour</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Droplets className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-medium">Water Usage</h3>
              <p className="text-sm text-gray-600">Today's Consumption</p>
            </div>
          </div>
          <p className="text-2xl font-bold">750 L</p>
          <div className="mt-2 text-sm text-red-600">↑ 12% above average</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium">Energy Usage</h3>
              <p className="text-sm text-gray-600">Current Consumption</p>
            </div>
          </div>
          <p className="text-2xl font-bold">45 kWh</p>
          <div className="mt-2 text-sm text-green-600">↓ 8% below average</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedMetric('occupancy')}
            className={`px-4 py-2 rounded-lg ${
              selectedMetric === 'occupancy'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Occupancy
          </button>
          <button
            onClick={() => setSelectedMetric('water')}
            className={`px-4 py-2 rounded-lg ${
              selectedMetric === 'water'
                ? 'bg-cyan-100 text-cyan-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Water Usage
          </button>
          <button
            onClick={() => setSelectedMetric('energy')}
            className={`px-4 py-2 rounded-lg ${
              selectedMetric === 'energy'
                ? 'bg-yellow-100 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Energy Usage
          </button>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={
                selectedMetric === 'occupancy'
                  ? mockRealTimeData.classroomOccupancy
                  : selectedMetric === 'water'
                  ? mockRealTimeData.waterUsage
                  : mockRealTimeData.energyConsumption
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Current Value"
                stroke="#4f46e5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="threshold"
                name="Threshold"
                stroke="#ef4444"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-medium mb-4">Active Alerts</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${
                alert.severity === 'high'
                  ? 'bg-red-50'
                  : alert.severity === 'medium'
                  ? 'bg-yellow-50'
                  : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className={`h-5 w-5 mt-0.5 ${
                    alert.severity === 'high'
                      ? 'text-red-600'
                      : alert.severity === 'medium'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{alert.type}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        alert.severity === 'high'
                          ? 'bg-red-100 text-red-800'
                          : alert.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

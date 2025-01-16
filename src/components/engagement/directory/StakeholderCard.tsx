import React from 'react';
import { Building2, MapPin, Mail, Phone, UserCheck, UserPlus, Clock } from 'lucide-react';
import { Stakeholder } from '../../../types/directory';
import { useAuth } from '../../../contexts/AuthContext';

interface StakeholderCardProps {
  stakeholder: Stakeholder;
  onConnect: (id: string) => void;
}

export function StakeholderCard({ stakeholder, onConnect }: StakeholderCardProps) {
  const { user } = useAuth();

  const getConnectionStatus = () => {
    if (!user) return null;
    const connection = stakeholder.connections.find(
      conn => conn.user === user.id
    );
    return connection?.status;
  };

  const connectionStatus = getConnectionStatus();

  const renderConnectionButton = () => {
    if (!user) return null;

    switch (connectionStatus) {
      case 'accepted':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            <UserCheck className="h-4 w-4" />
            Connected
          </button>
        );
      case 'pending':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
            <Clock className="h-4 w-4" />
            Request Pending
          </button>
        );
      default:
        return (
          <button
            onClick={() => onConnect(stakeholder._id)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <UserPlus className="h-4 w-4" />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {stakeholder.imageUrl ? (
            <img
              src={stakeholder.imageUrl}
              alt={stakeholder.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-xl font-semibold">
              {stakeholder.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{stakeholder.name}</h3>
              <p className="text-gray-600 text-sm">{stakeholder.role}</p>
            </div>
            {renderConnectionButton()}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="h-4 w-4" />
              <span>{stakeholder.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{stakeholder.location.state}, {stakeholder.location.district}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${stakeholder.contact.email}`} className="text-indigo-600 hover:text-indigo-800">
                {stakeholder.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{stakeholder.contact.phone}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {stakeholder.expertise.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
// This is necessary because Webpack doesn't handle Leaflet's default icon paths correctly
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface EmergencyMapData {
  id: string;
  location_lat: number;
  location_lng: number;
  emergency_type: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  description: string | null;
  location_address: string | null;
  requester_name: string | null;
  status: string;
  created_at: string;
}

interface EmergencyMapProps {
  emergencies: EmergencyMapData[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export default function EmergencyMap({
  emergencies,
  center = [39.7817, -89.6501], // Default to Springfield, IL
  zoom = 12,
  height = '500px',
}: EmergencyMapProps) {
  // Filter out emergencies without coordinates
  const mappableEmergencies = emergencies.filter(
    (e) => e.location_lat !== null && e.location_lng !== null
  );

  // Create custom colored marker icons based on urgency
  const createCustomIcon = (urgency: string) => {
    const colors = {
      critical: '#EF4444', // red-500
      high: '#F97316', // orange-500
      medium: '#EAB308', // yellow-500
      low: '#3B82F6', // blue-500
    };

    const color = colors[urgency as keyof typeof colors] || '#6B7280'; // gray-500 default

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">
          <div style="
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(45deg);
            color: white;
            font-weight: bold;
            font-size: 12px;
          ">!</div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  };

  // Get urgency badge color
  const getUrgencyBadgeColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  if (mappableEmergencies.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg"
        style={{ height }}
      >
        <div className="text-center p-6">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No emergencies to map</h3>
          <p className="mt-1 text-sm text-gray-500">
            Emergencies with location data will appear on the map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: '100%', borderRadius: '8px' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mappableEmergencies.map((emergency) => (
        <Marker
          key={emergency.id}
          position={[emergency.location_lat, emergency.location_lng]}
          icon={createCustomIcon(emergency.urgency)}
        >
          <Popup maxWidth={300}>
            <div className="p-2">
              {/* Urgency Badge */}
              <div className="mb-2">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${getUrgencyBadgeColor(
                    emergency.urgency
                  )}`}
                >
                  {emergency.urgency.toUpperCase()} URGENCY
                </span>
              </div>

              {/* Emergency Type */}
              <div className="font-bold text-lg capitalize text-gray-900 mb-2">
                {emergency.emergency_type.replace('_', ' ')}
              </div>

              {/* Description */}
              {emergency.description && (
                <div className="text-sm text-gray-700 mb-2 line-clamp-3">
                  {emergency.description}
                </div>
              )}

              {/* Location */}
              {emergency.location_address && (
                <div className="text-xs text-gray-600 mb-2 flex items-start gap-1">
                  <svg
                    className="h-4 w-4 text-gray-400 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{emergency.location_address}</span>
                </div>
              )}

              {/* Requester */}
              {emergency.requester_name && (
                <div className="text-xs text-gray-600 mb-2">
                  <span className="font-medium">Requested by:</span> {emergency.requester_name}
                </div>
              )}

              {/* Time */}
              <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                {formatDate(emergency.created_at)}
              </div>

              {/* Status */}
              <div className="mt-2">
                <span className="text-xs text-gray-600">
                  Status: <span className="font-medium capitalize">{emergency.status}</span>
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ircas_government, ircas_private } from '../data/centers';

// Karnataka center coordinates and bounds
const KARNATAKA_CENTER: [number, number] = [15.3173, 75.7139];
const KARNATAKA_BOUNDS: [[number, number], [number, number]] = [
  [11.5, 74.0],  // Southwest corner
  [18.5, 78.5]   // Northeast corner
];

interface MapComponentProps {
  selectedCenter?: any;
  onCenterSelect?: (center: any) => void;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  selectedCenter,
  onCenterSelect,
  className = "h-96 w-full rounded-lg"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map with Karnataka bounds
    const map = L.map(mapRef.current, {
      center: KARNATAKA_CENTER,
      zoom: 7.5,
      minZoom: 7,
      maxZoom: 18,
      maxBounds: KARNATAKA_BOUNDS,
      maxBoundsViscosity: 1.0
    });

    // Fit map to Karnataka bounds
    map.fitBounds(KARNATAKA_BOUNDS);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      minZoom: 7
    }).addTo(map);

    // Configure default marker icon
    const defaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add markers for each center
    const allCenters = [...ircas_government, ...ircas_private];
    allCenters.forEach((center: any) => {
      if (center.coordinates) {
        const marker = L.marker([center.coordinates.lat, center.coordinates.lng], {
          icon: defaultIcon
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2 min-w-48">
            <h3 class="font-semibold text-primary mb-1">${center.name}</h3>
            <div class="mb-2">${center.district}</div>
            <p class="text-sm text-muted-foreground mb-2">${center.address}</p>
            <div class="flex items-center space-x-2 text-sm mb-2">
              <span>${center.beds} beds</span>
            </div>
            <button class="w-full bg-primary text-white px-3 py-1 rounded text-sm" onclick="window.selectCenter('${center.id}')">
              View Details
            </button>
          </div>
        `);
      }
    });

    mapInstanceRef.current = map;

    // Make selectCenter function available globally for popup buttons
    (window as any).selectCenter = (centerId: string) => {
      const allCenters = [...ircas_government, ...ircas_private];
      const center = allCenters.find((c: any) => c.id === parseInt(centerId));
      if (center && onCenterSelect) {
        onCenterSelect(center);
      }
    };

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onCenterSelect]);

  return (
    <div
      ref={mapRef}
      className={`${className} bg-gray-100`}
      style={{ minHeight: '400px' }}
    />
  );
};

export default MapComponent;

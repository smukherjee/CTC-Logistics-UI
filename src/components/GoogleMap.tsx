import { useEffect, useRef, useState } from 'react';
import { Trip } from './KanbanBoard';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Navigation, Truck } from 'lucide-react';

interface GoogleMapProps {
  trips: Trip[];
  onTripClick: (trip: Trip) => void;
}

// Extend Window interface to include google
declare global {
  interface Window {
    google: typeof google;
  }
}

export function GoogleMap({ trips, onTripClick }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "#EAB308"; // yellow-500
      case "Dispatched": return "#3B82F6"; // blue-500
      case "Delivered": return "#22C55E"; // green-500
      case "Loading": return "#A855F7"; // purple-500
      default: return "#6B7280"; // gray-500
    }
  };

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        console.log('Google Maps loaded successfully');
        setIsGoogleLoaded(true);
        // Set default location immediately
        setUserLocation({ lat: 20.5937, lng: 78.9629 }); // India center
        setIsLoading(false);
      } else {
        console.log('Waiting for Google Maps...');
        // Retry after a short delay
        setTimeout(checkGoogleMaps, 100);
      }
    };
    checkGoogleMaps();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !isGoogleLoaded || !window.google || !userLocation) {
      console.log('Map init check:', { 
        hasRef: !!mapRef.current, 
        isGoogleLoaded, 
        hasGoogle: !!window.google, 
        hasUserLocation: !!userLocation 
      });
      return;
    }

    console.log('Initializing map...');
    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 6,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      console.log('Map initialized successfully');
      setMap(mapInstance);
    } catch (error) {
      console.error('Error initializing map:', error);
    }

  }, [isGoogleLoaded, userLocation]);

  // Add trip markers
  useEffect(() => {
    if (!map || !isGoogleLoaded || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = [];
    const bounds = new window.google.maps.LatLngBounds();

    trips.forEach((trip) => {
      if (trip.lat && trip.lng) {
        const position = { lat: trip.lat, lng: trip.lng };
        
        // Create custom marker with truck icon
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: trip.lrNumber,
          icon: {
            path: "M17.5,12A5.5,5.5,0,1,1,12,6.5,5.5,5.5,0,0,1,17.5,12Z", // Circle path
            fillColor: getStatusColor(trip.status || ''),
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 1.5,
            anchor: new window.google.maps.Point(12, 12),
          },
          animation: window.google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">${trip.lrNumber}</h3>
              <p style="margin: 4px 0; font-size: 12px; color: #666;">
                <strong>Party:</strong> ${trip.party}
              </p>
              <p style="margin: 4px 0; font-size: 12px; color: #666;">
                <strong>Vehicle:</strong> ${trip.vehicleNo}
              </p>
              <p style="margin: 4px 0; font-size: 12px; color: #666;">
                <strong>Route:</strong> ${trip.from} → ${trip.to}
              </p>
              <p style="margin: 4px 0; font-size: 12px; color: #666;">
                <strong>Location:</strong> ${trip.currentLocation || 'Unknown'}
              </p>
              <p style="margin: 8px 0 0 0;">
                <span style="display: inline-block; padding: 2px 8px; background: ${getStatusColor(trip.status || '')}; color: white; border-radius: 4px; font-size: 11px;">
                  ${trip.status}
                </span>
              </p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          onTripClick(trip);
        });

        newMarkers.push(marker);
        bounds.extend(position);
      }
    });

    // Include user location in bounds if available
    if (userLocation) {
      bounds.extend(userLocation);
    }

    // Fit map to show all markers, or zoom to show India if no specific trips
    if (newMarkers.length > 0) {
      map.fitBounds(bounds);
    } else if (userLocation) {
      map.setCenter(userLocation);
      map.setZoom(5);
    }

    setMarkers(newMarkers);
  }, [map, trips, userLocation, onTripClick, isGoogleLoaded]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Dispatched": return "bg-blue-100 text-blue-800 border-blue-300";
      case "Delivered": return "bg-green-100 text-green-800 border-green-300";
      case "Loading": return "bg-purple-100 text-purple-800 border-purple-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Card className="p-2">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        {/* Loading State */}
        {(isLoading || !isGoogleLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-50 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {!isGoogleLoaded ? 'Loading Google Maps...' : 'Getting your location...'}
              </p>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div ref={mapRef} className="w-full h-full bg-gray-200 min-h-[400px]" />

        {/* Map Header */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
          <Card className="px-2 py-1 shadow-lg pointer-events-auto">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium">Live Vehicle Tracking</span>
            </div>
          </Card>
          <Card className="px-2 py-1 shadow-lg pointer-events-auto">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-[10px]">Transit</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-[10px]">Dispatched</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px]">Delivered</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-[10px]">Loading</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Trip Count */}
        <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
          <Card className="px-2 py-1 shadow-lg pointer-events-auto">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-blue-600" />
              <p className="text-xs font-medium">{trips.length} Active Trips</p>
            </div>
          </Card>
        </div>

        {/* Center to Current Location Button */}
        <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
          <button
            onClick={() => {
              if (map) {
                // Try to get user's location when they click the button
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                      };
                      map.panTo(userPos);
                      map.setZoom(12);
                      
                      // Add/update user location marker
                      new window.google.maps.Marker({
                        position: userPos,
                        map: map,
                        icon: {
                          path: window.google.maps.SymbolPath.CIRCLE,
                          scale: 8,
                          fillColor: '#1E88E5',
                          fillOpacity: 1,
                          strokeColor: '#ffffff',
                          strokeWeight: 2,
                        },
                        title: 'Your Location',
                      });
                    },
                    (error) => {
                      console.error('Error getting location:', error);
                      alert('Unable to get your location. Please enable location services.');
                    }
                  );
                } else {
                  alert('Geolocation is not supported by your browser.');
                }
              }
            }}
            className="w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors pointer-events-auto"
            title="Center to your location"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </Card>
  );
}

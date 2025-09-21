import { useEffect, useRef, useState } from 'react';

const GoogleMapComponent = ({ selectedPoint, onMapClick, apiKey }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Load Google Maps JavaScript API
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };
    
    script.onerror = () => {
      setError('Failed to load Google Maps API');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  // Initialize map when loaded
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    try {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20, lng: 0 },
        zoom: 3,
        mapTypeId: 'satellite',
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
      });

      // Add click listener
      mapInstanceRef.current.addListener('click', (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        onMapClick({
          latLng: {
            lat: () => lat,
            lng: () => lng
          }
        });
      });

    } catch (err) {
      console.error('Error initializing Google Maps:', err);
      setError('Failed to initialize Google Maps');
    }
  }, [isLoaded, onMapClick]);

  // Update marker when selectedPoint changes
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Add new marker if point selected
    if (selectedPoint) {
      markerRef.current = new window.google.maps.Marker({
        position: selectedPoint,
        map: mapInstanceRef.current,
        title: `Selected Location: ${selectedPoint.lat.toFixed(4)}, ${selectedPoint.lng.toFixed(4)}`
      });
    }
  }, [selectedPoint]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-2">⚠️</div>
          <p>{error}</p>
          <p className="text-sm text-white/60 mt-2">Please check your API key and internet connection</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent mx-auto mb-2"></div>
          <p>Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMapComponent;
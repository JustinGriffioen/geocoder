import { useRef, useState, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import '@maplibre/maplibre-gl-style-spec';
import 'maplibre-gl/dist/maplibre-gl.css';

const OSM_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap'
    }
  },
  layers: [{
    id: 'osm',
    type: 'raster',
    source: 'osm',
    minzoom: 0,
    maxzoom: 19
  }]
};

const MAP_STYLES = {
  osm: OSM_STYLE,
  satellite: {
    version: 8,
    sources: {
      satellite: {
        type: 'raster',
        tiles: ['https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        attribution: '© Esri'
      }
    },
    layers: [{
      id: 'satellite',
      type: 'raster',
      source: 'satellite',
      minzoom: 0,
      maxzoom: 19
    }]
  }
};

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [currentStyle, setCurrentStyle] = useState('osm');

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLES[currentStyle],
      center: [-74.5, 40],
      zoom: 9,
      maxZoom: 19
    });

    // Add navigation controls
    mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');
    
    // Add custom style switcher
    const styleSwitcherDiv = document.createElement('div');
    styleSwitcherDiv.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    const styleSwitcherButton = document.createElement('button');
    styleSwitcherButton.className = 'maplibregl-ctrl-icon';
    styleSwitcherButton.innerHTML = currentStyle === 'osm' ? '🛰️' : '🗺️';
    styleSwitcherButton.addEventListener('click', () => {
      const newStyle = currentStyle === 'osm' ? 'satellite' : 'osm';
      setCurrentStyle(newStyle);
      map.current?.setStyle(MAP_STYLES[newStyle]);
      styleSwitcherButton.innerHTML = newStyle === 'osm' ? '🛰️' : '🗺️';
    });
    styleSwitcherDiv.appendChild(styleSwitcherButton);
    mapInstance.addControl({
      onAdd: () => styleSwitcherDiv,
      onRemove: () => {},
    }, 'top-right');

    map.current = mapInstance;

    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [currentStyle]);
  
  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
};

export default Map;
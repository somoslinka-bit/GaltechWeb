import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAP_POINTS, CATEGORIES } from '../constants';
import { ImageAccordion } from './ui/image-accordion';

// Fix for default Leaflet marker icons in React
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconShadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icon definition
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [14, 23],
  iconAnchor: [7, 23],
  popupAnchor: [1, -20],
  shadowSize: [23, 23]
});

// Component to handle map invalidation on mount
const MapUpdater = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

function FixLeafletResize() {
  const map = useMap();

  React.useEffect(() => {
    // 1) Al montar (por si el contenedor todavía se está acomodando)
    setTimeout(() => map.invalidateSize(), 0);
    setTimeout(() => map.invalidateSize(), 300);
    setTimeout(() => map.invalidateSize(), 800);

    // 2) En resize/orientación
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [map]);

  return null;
}


const ProjectsMap = () => {
  const centerPosition: [number, number] = [-36.5, -60.5];
  const zoomLevel = 6;

  return (
    <section id="obras" className="bg-slate-900 border-t border-slate-800">
            {/* Rubros (acordeón horizontal de imágenes) */}
      <div className="relative z-10 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
              Nuestros proyectos
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Proyectos por rubro
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl">
              Pasá el cursor sobre un rubro para ver la galería de obras ejecutadas.
            </p>
          </div>

          <ImageAccordion categories={CATEGORIES} />
        </div>
      </div>

      <div className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            Cobertura
          </span>
          <h2 className="text-3xl font-bold text-white">
            Presencia nacional
          </h2>
          <p className="mt-2 text-slate-400 max-w-xl text-sm md:text-base">
            Ejecutamos obras industriales en distintas localidades del país, acompañando el crecimiento productivo de nuestros clientes.
          </p>
        </div>
      </div>

      <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
        <MapContainer 
          center={centerPosition} 
          zoom={zoomLevel} 
          scrollWheelZoom={false} 
          style={{ height: "100%", width: "100%" }}
          className="w-full h-full z-0" 
          whenReady={(e) => {
    // Recalcula el tamaño cuando Leaflet termina de iniciar
    setTimeout(() => {
      e.target.invalidateSize();
    }, 200);
  }}
        >
        
<FixLeafletResize />


          <MapUpdater />
          {/* Versión anterior (claro, CartoDB):
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {MAP_POINTS.map((point) => (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={customIcon}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={0.95}>
                <span style={{ fontSize: 11, color: '#64748b' }}>{point.location}</span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

    
    </section>
  );
};

export default ProjectsMap;
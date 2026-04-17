import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { PROJECTS } from '../constants';
import { MapPin, X } from 'lucide-react';

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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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
  const [showOverlayCard, setShowOverlayCard] = useState(true);

  // Center of Argentina (approx)
  const centerPosition: [number, number] = [-38.4161, -63.6167];
  const zoomLevel = 6;

  return (
    <section id="obras" className="relative bg-slate-900 border-t border-slate-800">
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none p-8 md:p-12 bg-gradient-to-b from-slate-900/90 to-transparent h-48">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center md:text-left drop-shadow-md">
            Obras Realizadas
          </h2>
          <p className="text-galtech-accent font-medium text-center md:text-left drop-shadow-sm">
            Proyectos ejecutados por Galtech en todo el país
          </p>
        </div>
      </div>
            {/* Proyectos (cards debajo del mapa) */}
      <div className="relative z-10 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Proyectos de construcción industrial ejecutados
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl">
              Desarrollamos obras adaptadas a cada necesidad productiva, manteniendo estándares homogéneos de calidad y control.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.slice(0, 4).map((project) => (
              <article
                key={`card-${project.id}`}
                className="relative h-72 overflow-hidden rounded-lg cursor-pointer group"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-galtech-accent text-white rounded mb-2">
                    {project.type}
                  </span>
                  <h4 className="text-white font-bold text-base leading-tight">
                    {project.title}
                  </h4>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#/proyectos"
              className="inline-flex items-center justify-center px-8 py-4 bg-galtech-accent text-white font-bold text-lg rounded-sm hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-300/20"
            >
              Ver más proyectos
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
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
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {PROJECTS.map((project) => (
            <Marker 
              key={project.id} 
              position={[project.lat, project.lng]} 
              icon={customIcon}
            >
              <Popup>
                <div className="w-full">
                  <div className="h-32 w-full mb-3 overflow-hidden rounded-sm relative">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-galtech-accent text-white text-xs font-bold px-2 py-1">
                      {project.year}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{project.title}</h3>
                  <div className="text-xs text-slate-600 flex items-center mb-1">
                    <MapPin size={12} className="mr-1" /> {project.location}
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="block text-slate-400">Superficie</span>
                      <span className="font-semibold text-slate-800">{project.area}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Tipo</span>
                      <span className="font-semibold text-slate-800">{project.type}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

    
    </section>
  );
};

export default ProjectsMap;
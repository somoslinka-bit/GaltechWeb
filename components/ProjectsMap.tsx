import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAP_POINTS, CATEGORIES } from '../constants';

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
  // Centro geográfico de Argentina
  const centerPosition: [number, number] = [-38.5, -63.6];
  const zoomLevel = 5;

  return (
    <section id="obras" className="relative bg-slate-900 border-t border-slate-800">
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none p-8 md:p-12 bg-gradient-to-b from-slate-900/90 to-transparent h-48">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center md:text-left drop-shadow-md">
            Presencia territorial
          </h2>
          <p className="text-gray-300 text-sm md:text-base text-center md:text-left drop-shadow-sm max-w-xl mt-1">
            Ejecutamos obras industriales en distintas localidades, acompañando el crecimiento productivo de nuestros clientes.
          </p>
        </div>
      </div>
            {/* Rubros (grilla de categorías) */}
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
              Hacé click en un rubro para ver la galería de obras ejecutadas por Galtech.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.key}
                href={`#/proyectos/${cat.key}`}
                className="group block text-left bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="h-44 overflow-hidden relative bg-slate-800">
                  <img
                    src={cat.images[0]}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-galtech-accent transition-colors">
                    {cat.label}
                  </h3>
                  <span className="inline-flex items-center mt-2 text-sm font-semibold text-galtech-accent">
                    Ver galería
                    <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
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
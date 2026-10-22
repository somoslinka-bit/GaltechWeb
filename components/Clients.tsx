import React from 'react';

// ratio = ancho / alto del logo ya recortado a su contenido (sin márgenes)
const clients: { name: string; logo: string; ratio: number; darkBg?: boolean }[] = [
  { name: 'Agropac',            logo: '/Logos Clientes/Agropac.png',                ratio: 1.4 },
  { name: 'Alfajores Payes',    logo: '/Logos Clientes/Alfajores Payes.png',        ratio: 0.94 },
  { name: 'Carlitos',           logo: '/Logos Clientes/Carlitos.png',               ratio: 3.75 },
  { name: 'Carranza Vial',      logo: '/Logos Clientes/Carranza Vial SRL.png',      ratio: 5.44 },
  { name: 'Catriel',            logo: '/Logos Clientes/Catriel.png',                ratio: 3.2 },
  { name: 'Ceres Tolvas',       logo: '/Logos Clientes/maxresdefault.png',          ratio: 4.6 },
  { name: 'Coopagro Tandil',    logo: '/Logos Clientes/coopagro-tandil.png',        ratio: 1.27 },
  { name: 'CropTalent',         logo: '/Logos Clientes/CropTalent.png',             ratio: 2.51 },
  { name: 'Distribuidora Z',    logo: '/Logos Clientes/Distribuidora Z.png',        ratio: 0.69 },
  { name: 'Folilagro',          logo: '/Logos Clientes/Folilagro2.png',             ratio: 4.02 },
  { name: 'Grupo Battistessa',  logo: '/Logos Clientes/Grupo Batissttesa.png',      ratio: 4.19 },
  { name: 'José Luis González', logo: '/Logos Clientes/JLG-Tandil-scaled.png',      ratio: 1.02 },
  { name: 'La Casa del Piso',   logo: '/Logos Clientes/La casa del Piso.png',       ratio: 1 },
  { name: 'La Segunda Seguros', logo: '/Logos Clientes/La-Segunda-Seguros-nueva-marca-1.png', ratio: 3.72 },
  { name: 'Deconews',           logo: '/Logos Clientes/LOGODECO.png',               ratio: 1.92 },
  { name: 'Materiales Tandil',  logo: '/Logos Clientes/Materiales Tandil.png',      ratio: 2.31 },
  { name: 'Petrotandil',        logo: '/Logos Clientes/logo-petrotandil-b.png',     ratio: 4.12 },
  { name: 'Schang',             logo: '/Logos Clientes/Schang.png',                 ratio: 2.61 },
  { name: 'Surco Nuevo',        logo: '/Logos Clientes/Surco Nuevo.png',            ratio: 4.17 },
  { name: 'Terramar',           logo: '/Logos Clientes/terramar-brands-logo-png_seeklogo-328028.png', ratio: 2.12 },
];

// Todos los logos ocupan la misma área visual: uno cuadrado y uno alargado
// se perciben del mismo tamaño aunque sus dimensiones sean distintas.
const LOGO_AREA = 5600; // px² (≈ 75×75 para un logo cuadrado)
const LOGO_MAX_W = 180;
const LOGO_MAX_H = 76;

function logoSize(ratio: number) {
  let width = Math.sqrt(LOGO_AREA * ratio);
  let height = width / ratio;
  if (width > LOGO_MAX_W) { width = LOGO_MAX_W; height = width / ratio; }
  if (height > LOGO_MAX_H) { height = LOGO_MAX_H; width = height * ratio; }
  return { width: Math.round(width), height: Math.round(height) };
}

const LogoItem: React.FC<{ client: typeof clients[0] }> = ({ client }) => {
  const size = logoSize(client.ratio);

  if (client.darkBg) {
    return (
      <div className="mx-6 w-52 h-24 flex items-center justify-center flex-shrink-0 bg-slate-700 rounded-lg opacity-70 hover:opacity-100 transition-all duration-300">
        <img src={client.logo} alt={client.name} style={size} className="object-contain" />
      </div>
    );
  }

  return (
    <div className="mx-6 w-52 h-24 flex items-center justify-center flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <img src={client.logo} alt={client.name} style={size} className="object-contain mix-blend-multiply" />
    </div>
  );
};

export default function Clients() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-800 uppercase tracking-widest">
          Nuestros Clientes
        </h2>
        <div className="w-24 h-1 bg-galtech-accent mx-auto mt-4"></div>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {clients.map((client, index) => (
            <LogoItem key={index} client={client} />
          ))}
          {clients.map((client, index) => (
            <LogoItem key={`dup-${index}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}

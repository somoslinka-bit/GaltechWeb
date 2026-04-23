import React from 'react';

const clients: { name: string; logo: string; darkBg?: boolean }[] = [
  { name: 'Agropac',           logo: '/Logos Clientes/Agropac.jpg' },
  { name: 'Alfajores Payes',   logo: '/Logos Clientes/Alfajores Payes.jpeg' },
  { name: 'Autosan',           logo: '/Logos Clientes/autosan.svg' },
  { name: 'Carlitos',          logo: '/Logos Clientes/Carlitos.png' },
  { name: 'Carranza Vial',     logo: '/Logos Clientes/Carranza Vial SRL.png' },
  { name: 'Catriel',           logo: '/Logos Clientes/Catriel.png' },
  { name: 'Ceres Tolvas',      logo: '/Logos Clientes/maxresdefault.jpg' },
  { name: 'Coopagro Tandil',   logo: '/Logos Clientes/coopagro-tandil.png' },
  { name: 'CropTalent',        logo: '/Logos Clientes/CropTalent.png' },
  { name: 'Distribuidora Z',   logo: '/Logos Clientes/Distribuidora Z.jpg' },
  { name: 'El Tandil',         logo: '/Logos Clientes/El tandil.png' },
  { name: 'Estilo Olivia',     logo: '/Logos Clientes/Estilo Olivia.png' },
  { name: 'Folilagro',         logo: '/Logos Clientes/Folilagro2.png' },
  { name: 'Grupo Batissttesa', logo: '/Logos Clientes/Grupo Batissttesa.gif' },
  { name: 'Irrisup',           logo: '/Logos Clientes/unnamed-2.png', darkBg: true },
  { name: 'JLG Tandil',        logo: '/Logos Clientes/JLG-Tandil-scaled.jpg' },
  { name: 'La Casa del Piso',  logo: '/Logos Clientes/La casa del Piso.png' },
  { name: 'La Segunda Seguros',logo: '/Logos Clientes/La-Segunda-Seguros-nueva-marca-1.png' },
  { name: 'LOGODECO',          logo: '/Logos Clientes/LOGODECO.jpg' },
  { name: 'Materiales Tandil', logo: '/Logos Clientes/Materiales Tandil.png' },
  { name: 'Olaf',              logo: '/Logos Clientes/Olaf.png' },
  { name: 'Petrotandil',       logo: '/Logos Clientes/logo-petrotandil-b.png' },
  { name: 'Schang',            logo: '/Logos Clientes/Schang.jpg' },
  { name: 'Surco Nuevo',       logo: '/Logos Clientes/Surco Nuevo.png' },
  { name: 'Terramar',          logo: '/Logos Clientes/terramar-brands-logo-png_seeklogo-328028.png' },
];

function LogoItem({ client, id }: { client: typeof clients[0]; id: string }) {
  if (client.darkBg) {
    return (
      <div
        key={id}
        className="mx-6 w-52 h-20 flex items-center justify-center flex-shrink-0 bg-slate-700 rounded-lg px-3 opacity-70 hover:opacity-100 transition-all duration-300"
      >
        <img
          src={client.logo}
          alt={client.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      key={id}
      className="mx-6 w-52 h-20 flex items-center justify-center flex-shrink-0 p-1 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
    >
      <img
        src={client.logo}
        alt={client.name}
        className="max-h-full max-w-full object-contain mix-blend-multiply"
      />
    </div>
  );
}

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
            <LogoItem key={index} client={client} id={String(index)} />
          ))}
          {clients.map((client, index) => (
            <LogoItem key={`dup-${index}`} client={client} id={`dup-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Envío de la solicitud de empleo.
// Todo el envío pasa por acá: cuando esté el mail del dominio solo hay que
// definir VITE_JOB_FORM_ENDPOINT (URL que recibe el JSON y manda el mail).

export interface PreviousJob {
  empresa: string;
  telefono: string;
  jefe: string;
  direccion: string;
  puesto: string;
  desde: string;
  hasta: string;
  funciones: string;
  motivoSalida: string;
}

export const emptyJob = (): PreviousJob => ({
  empresa: '',
  telefono: '',
  jefe: '',
  direccion: '',
  puesto: '',
  desde: '',
  hasta: '',
  funciones: '',
  motivoSalida: '',
});

export interface ApplicationData {
  // Datos personales
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  dni: string;
  cuil: string;
  estadoCivil: string;
  hijos: string;
  conoceAlguien: string; // 'Sí' | 'No'
  conoceA: string;
  // Puesto
  puesto: string;
  tareas: string;
  // Situación actual
  trabajaActualmente: string;
  trabajaDonde: string;
  trabajaPuesto: string;
  motivoCambio: string;
  // Empleos anteriores
  empleos: PreviousJob[];
  // Preguntas de rutina
  sabeSoldar: string;
  soldarCon: string;
  viaja: string;
  viajaPorque: string;
  fuma: string;
  fumaCuantos: string;
  carnet: string;
  carnetCategorias: string;
  salud: string;
  vertigo: string;
  accidentes: string;
  secuelas: string;
  dificultadFuerza: string;
  dificultadFuerzaMotivo: string;
  antecedentes: string;
  antecedentesDetalle: string;
  sindicato: string;
  juicios: string;
  juiciosEmpresa: string;
  juiciosMotivo: string;
  // Consentimiento
  acepta: boolean;
}

export const emptyApplication = (): ApplicationData => ({
  nombre: '',
  direccion: '',
  telefono: '',
  email: '',
  fechaNacimiento: '',
  lugarNacimiento: '',
  dni: '',
  cuil: '',
  estadoCivil: '',
  hijos: '',
  conoceAlguien: '',
  conoceA: '',
  puesto: '',
  tareas: '',
  trabajaActualmente: '',
  trabajaDonde: '',
  trabajaPuesto: '',
  motivoCambio: '',
  empleos: [emptyJob()],
  sabeSoldar: '',
  soldarCon: '',
  viaja: '',
  viajaPorque: '',
  fuma: '',
  fumaCuantos: '',
  carnet: '',
  carnetCategorias: '',
  salud: '',
  vertigo: '',
  accidentes: '',
  secuelas: '',
  dificultadFuerza: '',
  dificultadFuerzaMotivo: '',
  antecedentes: '',
  antecedentesDetalle: '',
  sindicato: '',
  juicios: '',
  juiciosEmpresa: '',
  juiciosMotivo: '',
  acepta: false,
});

const calcularEdad = (fechaNacimiento: string): number | null => {
  const nac = new Date(fechaNacimiento);
  if (Number.isNaN(nac.getTime())) return null;
  const hoy = new Date();
  let edad = hoy.getFullYear() - nac.getFullYear();
  const aunNoCumplio =
    hoy.getMonth() < nac.getMonth() ||
    (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate());
  if (aunNoCumplio) edad -= 1;
  return edad;
};

const ENDPOINT: string | undefined = (import.meta as any).env?.VITE_JOB_FORM_ENDPOINT;

export const submitApplication = async (data: ApplicationData, honeypot: string) => {
  if (!ENDPOINT) {
    throw new Error('VITE_JOB_FORM_ENDPOINT no está configurado');
  }

  const payload = {
    ...data,
    // Solo mandamos los empleos que tengan al menos la empresa cargada
    empleos: data.empleos.filter((j) => j.empresa.trim() !== ''),
    edad: calcularEdad(data.fechaNacimiento),
    fecha: new Date().toLocaleDateString('es-AR'),
    website: honeypot, // campo trampa anti-spam: tiene que llegar vacío
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error ${res.status} al enviar la postulación`);
};

import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  ApplicationData,
  PreviousJob,
  emptyApplication,
  emptyJob,
  submitApplication,
} from '../lib/job-application';

const MAX_EMPLEOS = 3;

const STEPS = ['Datos personales', 'Puesto y situación actual', 'Empleos anteriores', 'Preguntas generales'];

const inputClass =
  'w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-galtech-accent focus:border-transparent bg-white';
const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5';

// --- Campos reutilizables (fuera del componente para no perder el foco al escribir) ---

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

const Field = ({ label, value, onChange, required, type = 'text', placeholder, inputMode }: FieldProps) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && ' *'}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      inputMode={inputMode}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  </div>
);

interface AreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}

const Area = ({ label, value, onChange, required, rows = 3, placeholder }: AreaProps) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && ' *'}
    </label>
    <textarea
      required={required}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} resize-none`}
    />
  </div>
);

interface YesNoProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const YesNo = ({ label, name, value, onChange, required = true }: YesNoProps) => (
  <fieldset>
    <legend className={labelClass}>
      {label}
      {required && ' *'}
    </legend>
    <div className="flex gap-6">
      {['Sí', 'No'].map((opt) => (
        <label key={opt} className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            required={required}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="w-4 h-4 accent-[#ff8727]"
          />
          {opt}
        </label>
      ))}
    </div>
  </fieldset>
);

const JobApplication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<ApplicationData>(emptyApplication());
  const [honeypot, setHoneypot] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ApplicationData>(key: K, value: ApplicationData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const setJob = (index: number, key: keyof PreviousJob, value: string) =>
    setData((prev) => ({
      ...prev,
      empleos: prev.empleos.map((job, i) => (i === index ? { ...job, [key]: value } : job)),
    }));

  const addJob = () => setData((prev) => ({ ...prev, empleos: [...prev.empleos, emptyJob()] }));
  const removeJob = (index: number) =>
    setData((prev) => ({ ...prev, empleos: prev.empleos.filter((_, i) => i !== index) }));

  const goTo = (next: number) => {
    setStep(next);
    modalRef.current?.scrollTo({ top: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      goTo(step + 1);
      return;
    }
    setSending(true);
    setError(false);
    try {
      await submitApplication(data, honeypot);
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    setIsOpen(false);
    setSent(false);
    setError(false);
    setStep(0);
    setData(emptyApplication());
  };

  const isLast = step === STEPS.length - 1;

  return (
    <>
      {/* Botón de acceso */}
      <section id="postulaciones" className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            Trabajá con nosotros
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Sumate al equipo Galtech</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            Si querés ser parte de nuestro equipo de trabajo, completá la solicitud de empleo.
            Evaluamos todos los perfiles.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center px-8 py-4 bg-galtech-accent text-white font-bold text-lg rounded-sm hover:bg-orange-600 transition-colors shadow-lg"
          >
            Completar solicitud de empleo
          </button>
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative bg-white rounded-sm shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header modal */}
            <div className="sticky top-0 bg-white px-6 pt-4 pb-3 border-b border-gray-200 z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-lg">Solicitud de empleo</h3>
                <button
                  onClick={close}
                  aria-label="Cerrar"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              {!sent && (
                <div className="mt-3">
                  <div className="flex gap-1.5">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-galtech-accent' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Paso {step + 1} de {STEPS.length} · {STEPS[step]}
                  </p>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="px-6 py-6">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xl mb-2">¡Solicitud enviada!</h4>
                  <p className="text-slate-600 mb-6">
                    Gracias por tu interés en Galtech. Revisaremos tu solicitud y nos comunicaremos si tu
                    perfil aplica.
                  </p>
                  <button
                    onClick={close}
                    className="px-6 py-3 bg-galtech-accent text-white font-bold rounded-sm hover:bg-orange-600 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Campo trampa anti-spam: las personas no lo ven */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute left-[-9999px] w-px h-px opacity-0"
                  />

                  {/* Paso 1: datos personales */}
                  {step === 0 && (
                    <>
                      <Field label="Nombre completo" required value={data.nombre} onChange={(v) => set('nombre', v)} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Teléfono" required type="tel" value={data.telefono} onChange={(v) => set('telefono', v)} placeholder="+54 9 ..." />
                        <Field label="Email" required type="email" value={data.email} onChange={(v) => set('email', v)} />
                      </div>
                      <Field label="Dirección" required value={data.direccion} onChange={(v) => set('direccion', v)} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Fecha de nacimiento" required type="date" value={data.fechaNacimiento} onChange={(v) => set('fechaNacimiento', v)} />
                        <Field label="Lugar de nacimiento" value={data.lugarNacimiento} onChange={(v) => set('lugarNacimiento', v)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="DNI" required inputMode="numeric" value={data.dni} onChange={(v) => set('dni', v)} />
                        <Field label="CUIL" required inputMode="numeric" value={data.cuil} onChange={(v) => set('cuil', v)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Estado civil" value={data.estadoCivil} onChange={(v) => set('estadoCivil', v)} />
                        <Field label="Nº de hijos" type="number" inputMode="numeric" value={data.hijos} onChange={(v) => set('hijos', v)} />
                      </div>
                      <YesNo label="¿Conocés a alguien de nuestra empresa?" name="conoceAlguien" value={data.conoceAlguien} onChange={(v) => set('conoceAlguien', v)} />
                      {data.conoceAlguien === 'Sí' && (
                        <Field label="¿A quién?" required value={data.conoceA} onChange={(v) => set('conoceA', v)} />
                      )}
                    </>
                  )}

                  {/* Paso 2: puesto y situación actual */}
                  {step === 1 && (
                    <>
                      <Field label="Puesto pretendido" required value={data.puesto} onChange={(v) => set('puesto', v)} />
                      <Area
                        label="Tareas que sabe realizar (referidas a la empresa)"
                        required
                        rows={4}
                        value={data.tareas}
                        onChange={(v) => set('tareas', v)}
                      />
                      <YesNo label="¿Trabajás actualmente?" name="trabajaActualmente" value={data.trabajaActualmente} onChange={(v) => set('trabajaActualmente', v)} />
                      {data.trabajaActualmente === 'Sí' && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="¿Dónde?" value={data.trabajaDonde} onChange={(v) => set('trabajaDonde', v)} />
                            <Field label="Puesto" value={data.trabajaPuesto} onChange={(v) => set('trabajaPuesto', v)} />
                          </div>
                          <Field label="¿Por qué deseás cambiarte?" value={data.motivoCambio} onChange={(v) => set('motivoCambio', v)} />
                        </>
                      )}
                    </>
                  )}

                  {/* Paso 3: empleos anteriores */}
                  {step === 2 && (
                    <>
                      <p className="text-sm text-slate-600">
                        Anotá primero el más reciente. Si es tu primer empleo, podés dejarlo vacío y continuar.
                      </p>
                      {data.empleos.map((job, i) => (
                        <div key={i} className="border border-gray-200 rounded-sm p-4 space-y-4 bg-slate-50">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-800 text-sm">Empleo {i + 1}</h4>
                            {data.empleos.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeJob(i)}
                                className="text-xs text-slate-500 hover:text-red-600 underline"
                              >
                                Quitar
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Empresa" value={job.empresa} onChange={(v) => setJob(i, 'empresa', v)} />
                            <Field label="Teléfono" type="tel" value={job.telefono} onChange={(v) => setJob(i, 'telefono', v)} />
                          </div>
                          <Field label="Jefe inmediato (encargado)" value={job.jefe} onChange={(v) => setJob(i, 'jefe', v)} />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Dirección" value={job.direccion} onChange={(v) => setJob(i, 'direccion', v)} />
                            <Field label="Puesto" value={job.puesto} onChange={(v) => setJob(i, 'puesto', v)} />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Trabajó desde (mes/año)" type="month" value={job.desde} onChange={(v) => setJob(i, 'desde', v)} />
                            <Field label="Hasta (mes/año)" type="month" value={job.hasta} onChange={(v) => setJob(i, 'hasta', v)} />
                          </div>
                          <Area label="Describa sus funciones" value={job.funciones} onChange={(v) => setJob(i, 'funciones', v)} />
                          <Field label="Motivo de salida" value={job.motivoSalida} onChange={(v) => setJob(i, 'motivoSalida', v)} />
                        </div>
                      ))}
                      {data.empleos.length < MAX_EMPLEOS && (
                        <button
                          type="button"
                          onClick={addJob}
                          className="text-sm font-semibold text-galtech-accent hover:underline"
                        >
                          + Agregar otro empleo
                        </button>
                      )}
                    </>
                  )}

                  {/* Paso 4: preguntas generales */}
                  {step === 3 && (
                    <>
                      <div className="space-y-2">
                        <YesNo label="¿Sabe soldar?" name="sabeSoldar" value={data.sabeSoldar} onChange={(v) => set('sabeSoldar', v)} />
                        {data.sabeSoldar === 'Sí' && (
                          <Field label="¿Con qué?" value={data.soldarCon} onChange={(v) => set('soldarCon', v)} placeholder="Electrodo, MIG, TIG..." />
                        )}
                      </div>

                      <div className="space-y-2">
                        <YesNo label="¿Tenés disponibilidad para viajar?" name="viaja" value={data.viaja} onChange={(v) => set('viaja', v)} />
                        {data.viaja === 'No' && (
                          <Field label="¿Por qué?" value={data.viajaPorque} onChange={(v) => set('viajaPorque', v)} />
                        )}
                      </div>

                      <div className="space-y-2">
                        <YesNo label="¿Fumás?" name="fuma" value={data.fuma} onChange={(v) => set('fuma', v)} />
                        {data.fuma === 'Sí' && (
                          <Field label="¿Cuántos por día?" type="number" inputMode="numeric" value={data.fumaCuantos} onChange={(v) => set('fumaCuantos', v)} />
                        )}
                      </div>

                      <div className="space-y-2">
                        <YesNo label="¿Tenés carnet de conducir?" name="carnet" value={data.carnet} onChange={(v) => set('carnet', v)} />
                        {data.carnet === 'Sí' && (
                          <Field label="¿Qué categorías?" value={data.carnetCategorias} onChange={(v) => set('carnetCategorias', v)} placeholder="B1, C, D..." />
                        )}
                      </div>

                      <Field label="¿Tenés problemas de salud?" value={data.salud} onChange={(v) => set('salud', v)} placeholder="Si no, escribí «No»" required />
                      <Field label="¿Tenés vértigo?" value={data.vertigo} onChange={(v) => set('vertigo', v)} placeholder="Si no, escribí «No»" required />

                      <div className="space-y-2">
                        <YesNo label="¿Tuviste accidentes laborales?" name="accidentes" value={data.accidentes} onChange={(v) => set('accidentes', v)} />
                        {data.accidentes === 'Sí' && (
                          <Field label="Secuelas" value={data.secuelas} onChange={(v) => set('secuelas', v)} />
                        )}
                      </div>

                      <div className="space-y-2">
                        <YesNo label="¿Tenés dificultad para hacer fuerza?" name="dificultadFuerza" value={data.dificultadFuerza} onChange={(v) => set('dificultadFuerza', v)} />
                        {data.dificultadFuerza === 'Sí' && (
                          <Field label="Motivo" value={data.dificultadFuerzaMotivo} onChange={(v) => set('dificultadFuerzaMotivo', v)} />
                        )}
                      </div>

                      <div className="space-y-2">
                        <YesNo label="¿Tenés antecedentes penales?" name="antecedentes" value={data.antecedentes} onChange={(v) => set('antecedentes', v)} />
                        {data.antecedentes === 'Sí' && (
                          <Field label="Carátula y número de causa" value={data.antecedentesDetalle} onChange={(v) => set('antecedentesDetalle', v)} />
                        )}
                      </div>

                      <Field
                        label="¿Estás afiliado al sindicato? ¿Sos delegado de personal?"
                        value={data.sindicato}
                        onChange={(v) => set('sindicato', v)}
                      />

                      <div className="space-y-2">
                        <YesNo label="¿Tuviste juicios laborales?" name="juicios" value={data.juicios} onChange={(v) => set('juicios', v)} />
                        {data.juicios === 'Sí' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="¿Con qué empresa?" value={data.juiciosEmpresa} onChange={(v) => set('juiciosEmpresa', v)} />
                            <Field label="¿Por qué motivo?" value={data.juiciosMotivo} onChange={(v) => set('juiciosMotivo', v)} />
                          </div>
                        )}
                      </div>

                      <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer pt-2">
                        <input
                          type="checkbox"
                          required
                          checked={data.acepta}
                          onChange={(e) => set('acepta', e.target.checked)}
                          className="mt-0.5 w-4 h-4 accent-[#ff8727]"
                        />
                        <span>
                          Declaro que los datos son verdaderos y autorizo a Galtech a usarlos para evaluar mi
                          postulación. *
                        </span>
                      </label>
                    </>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm p-3">
                      No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        disabled={sending}
                        className="px-6 py-3 border border-gray-300 text-slate-700 font-bold rounded-sm hover:bg-gray-50 transition-colors"
                      >
                        Atrás
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex-1 py-3 bg-galtech-accent text-white font-bold rounded-sm hover:bg-orange-600 transition-colors shadow disabled:opacity-60"
                    >
                      {isLast ? (sending ? 'Enviando...' : 'Enviar solicitud') : 'Siguiente'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobApplication;

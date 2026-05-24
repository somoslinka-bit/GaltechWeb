import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  cv: File | null;
}

const ROLES = [
  'Operario de planta',
  'Montajista / Soldador',
  'Operador de grúa / maquinaria pesada',
  'Chofer / Logística',
  'Ingeniero estructural / Técnico',
  'Administración / Contabilidad',
  'Otro',
];

const JobApplication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
    cv: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, cv: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Armamos el mensaje para WhatsApp
    const text = encodeURIComponent(
      `*Postulación Laboral — Galtech*\n\n` +
        `*Nombre:* ${form.name}\n` +
        `*Email:* ${form.email}\n` +
        `*Teléfono:* ${form.phone}\n` +
        `*Área de interés:* ${form.role}\n` +
        `*Mensaje:* ${form.message || '—'}`
    );
    window.open(`https://wa.me/5492494517644?text=${text}`, '_blank');
    setSent(true);
  };

  const close = () => {
    setIsOpen(false);
    setSent(false);
    setForm({ name: '', email: '', phone: '', role: '', message: '', cv: null });
  };

  return (
    <>
      {/* Botón de acceso (aparece en el footer o en la sección) */}
      <section id="postulaciones" className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-[#ff8727] font-bold uppercase tracking-widest text-sm mb-3">
            Trabajá con nosotros
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Sumate al equipo Galtech
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            Si querés ser parte de nuestro equipo de trabajo, completá el formulario de postulación.
            Evaluamos todos los perfiles.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center px-8 py-4 bg-galtech-accent text-white font-bold text-lg rounded-sm hover:bg-orange-600 transition-colors shadow-lg"
          >
            Enviar mi postulación
          </button>
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header modal */}
            <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-200 z-10">
              <h3 className="font-bold text-slate-900 text-lg">Postulación laboral</h3>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
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
                  <h4 className="font-bold text-slate-900 text-xl mb-2">¡Postulación enviada!</h4>
                  <p className="text-slate-600 mb-6">
                    Gracias por tu interés. Fuiste redirigido/a a WhatsApp para completar el envío.
                    Nos comunicaremos si tu perfil aplica.
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
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-galtech-accent focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="juan@email.com"
                        className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-galtech-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+54 9 ..."
                        className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-galtech-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Área de interés *
                    </label>
                    <select
                      name="role"
                      required
                      value={form.role}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-galtech-accent focus:border-transparent bg-white"
                    >
                      <option value="">Seleccioná una opción</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Mensaje / experiencia relevante
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Contanos brevemente sobre tu experiencia y por qué querés sumarte a Galtech..."
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-galtech-accent focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      CV / Currículum (opcional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFile}
                      className="w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-galtech-accent/10 file:text-galtech-accent hover:file:bg-galtech-accent/20"
                    />
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC o DOCX. Máx 5 MB.</p>
                  </div>

                  <p className="text-xs text-gray-400">
                    Al enviar, se abrirá WhatsApp con los datos de tu postulación. Podés adjuntar tu CV directamente
                    en el chat.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 bg-galtech-accent text-white font-bold rounded-sm hover:bg-orange-600 transition-colors shadow"
                  >
                    Enviar postulación por WhatsApp
                  </button>
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

import { useState } from 'react'
import CelerenLogo from './CelerenLogo.jsx'

const EMPTY_LEAD = { name: '', company: '', role: '', email: '', phone: '' }

export default function LeadForm({ onSubmit }) {
  const [lead, setLead] = useState(EMPTY_LEAD)
  const [touched, setTouched] = useState(false)

  const isValid = lead.name.trim() && lead.company.trim() && lead.role.trim() && lead.email.trim()

  function handleChange(field) {
    return (e) => setLead((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return
    onSubmit(lead)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <CelerenLogo className="h-8 mb-8 mx-auto block" />

        <h2 className="text-2xl font-semibold text-celeren-950 text-center">
          Antes de empezar, cuéntanos quién eres
        </h2>
        <p className="mt-2 text-sm text-celeren-700/80 text-center">
          Usaremos estos datos para enviarte tu diagnóstico y contactarte con recomendaciones.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Field
            label="Nombre completo"
            value={lead.name}
            onChange={handleChange('name')}
            error={touched && !lead.name.trim()}
            autoFocus
          />
          <Field
            label="Empresa"
            value={lead.company}
            onChange={handleChange('company')}
            error={touched && !lead.company.trim()}
          />
          <Field
            label="Cargo"
            value={lead.role}
            onChange={handleChange('role')}
            error={touched && !lead.role.trim()}
          />
          <Field
            label="Correo electrónico"
            type="email"
            value={lead.email}
            onChange={handleChange('email')}
            error={touched && !lead.email.trim()}
          />
          <Field
            label="Teléfono (opcional)"
            type="tel"
            value={lead.phone}
            onChange={handleChange('phone')}
          />

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-celeren-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-celeren-600/20 transition hover:bg-celeren-700 active:scale-[0.98]"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, error, ...inputProps }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-sm font-medium text-celeren-900">{label}</span>
      <input
        {...inputProps}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-celeren-950 outline-none transition focus:border-celeren-500 focus:ring-2 focus:ring-celeren-200 ${
          error ? 'border-red-400' : 'border-celeren-200'
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-500">Este campo es requerido</span>}
    </label>
  )
}

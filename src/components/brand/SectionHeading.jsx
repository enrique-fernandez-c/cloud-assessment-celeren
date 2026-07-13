import SectionDots from './SectionDots.jsx'

export default function SectionHeading({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SectionDots className="h-4 shrink-0" />
      <h3 className="text-lg font-semibold text-celeren-950">{children}</h3>
    </div>
  )
}

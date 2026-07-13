import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { DIMENSIONS } from '../../data/dimensions.js'

export default function DimensionRadarChart({ dimensionScores }) {
  const data = DIMENSIONS.map((d) => ({
    dimension: d.id,
    fullName: d.name,
    score: Number((dimensionScores[d.id] ?? 0).toFixed(2)),
  }))

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="#c7deeb" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: '#1c3a56', fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} tick={{ fill: '#599fc5', fontSize: 10 }} />
          <Radar name="Puntaje" dataKey="score" stroke="#006ba6" fill="#006ba6" fillOpacity={0.35} />
          <Tooltip
            formatter={(value, _name, props) => [value, props.payload.fullName]}
            contentStyle={{ borderRadius: 8, borderColor: '#c7deeb', fontSize: 13 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

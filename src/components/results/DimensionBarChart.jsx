import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { DIMENSIONS } from '../../data/dimensions.js'

function colorFor(score) {
  if (score <= 2) return '#ef4444'
  if (score <= 3.5) return '#f59e0b'
  return '#1c3a56'
}

export default function DimensionBarChart({ dimensionScores }) {
  const data = DIMENSIONS.map((d) => ({
    dimension: d.id,
    fullName: d.name,
    score: Number((dimensionScores[d.id] ?? 0).toFixed(2)),
  }))

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 24, right: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6f0f6" horizontal={false} />
          <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11, fill: '#599fc5' }} />
          <YAxis type="category" dataKey="dimension" width={36} tick={{ fontSize: 12, fill: '#1c3a56' }} />
          <Tooltip
            formatter={(value, _name, props) => [value, props.payload.fullName]}
            contentStyle={{ borderRadius: 8, borderColor: '#c7deeb', fontSize: 13 }}
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={16}>
            {data.map((entry) => (
              <Cell key={entry.dimension} fill={colorFor(entry.score)} />
            ))}
            <LabelList dataKey="score" position="right" style={{ fill: '#1c3a56', fontSize: 11 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

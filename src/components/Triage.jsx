import { useState } from 'react'
import { TRIAGE_QUESTIONS } from '../data/triage.js'
import ProgressBar from './ProgressBar.jsx'

export default function Triage({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const question = TRIAGE_QUESTIONS[index]
  const total = TRIAGE_QUESTIONS.length

  function selectOption(value) {
    const next = { ...answers, [question.id]: value }
    setAnswers(next)
    if (index < total - 1) {
      setIndex(index + 1)
    } else {
      onComplete(next)
    }
  }

  function goBack() {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <ProgressBar current={index + 1} total={total} label={`Preguntas de contexto ${index + 1} de ${total}`} />

        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-celeren-950">{question.text}</h2>

          <div className="mt-6 space-y-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectOption(opt.value)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  answers[question.id] === opt.value
                    ? 'border-celeren-500 bg-celeren-50 ring-2 ring-celeren-200'
                    : 'border-celeren-200 bg-white hover:border-celeren-400 hover:bg-celeren-50'
                }`}
              >
                <span className="text-celeren-950">{opt.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={goBack}
              disabled={index === 0}
              className="text-sm font-medium text-celeren-700 disabled:opacity-0"
            >
              ← Atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

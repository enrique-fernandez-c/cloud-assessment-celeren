import { useState } from 'react'
import { STAGE_FORMS } from '../data/stageForms.js'
import { dimensionName } from '../logic/scoring.js'
import ProgressBar from './ProgressBar.jsx'

export default function StageForm({ stage, onComplete }) {
  const questions = STAGE_FORMS[stage]
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const question = questions[index]
  const total = questions.length
  const isLast = index === total - 1

  function selectOption(score) {
    const next = { ...answers, [question.id]: score }
    setAnswers(next)
    if (!isLast) {
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
        <ProgressBar current={index + 1} total={total} label={`Pregunta ${index + 1} de ${total}`} />

        <div className="mt-10">
          <span className="inline-block rounded-full bg-celeren-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-celeren-700">
            {question.dimension} · {dimensionName(question.dimension)}
          </span>

          <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-celeren-950">{question.text}</h2>

          <div className="mt-6 space-y-3">
            {question.options.map((opt) => (
              <button
                key={opt.score}
                onClick={() => selectOption(opt.score)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  answers[question.id] === opt.score
                    ? 'border-celeren-500 bg-celeren-50 ring-2 ring-celeren-200'
                    : 'border-celeren-200 bg-white hover:border-celeren-400 hover:bg-celeren-50'
                }`}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-celeren-100 text-xs font-semibold text-celeren-700">
                  {opt.score}
                </span>
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

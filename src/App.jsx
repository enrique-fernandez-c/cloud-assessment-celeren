import { useState } from 'react'
import Welcome from './components/Welcome.jsx'
import LeadForm from './components/LeadForm.jsx'
import Triage from './components/Triage.jsx'
import StageForm from './components/StageForm.jsx'
import Results from './components/Results.jsx'
import { resolveStage } from './data/triage.js'
import { buildAssessmentResult } from './logic/scoring.js'
import { saveSubmission } from './logic/storage.js'

const STEPS = { WELCOME: 'welcome', LEAD: 'lead', TRIAGE: 'triage', STAGE: 'stage', RESULTS: 'results' }

function App() {
  const [step, setStep] = useState(STEPS.WELCOME)
  const [lead, setLead] = useState(null)
  const [triageAnswers, setTriageAnswers] = useState(null)
  const [stage, setStage] = useState(null)
  const [result, setResult] = useState(null)
  const [submission, setSubmission] = useState(null)

  function handleLeadSubmit(leadData) {
    setLead(leadData)
    setStep(STEPS.TRIAGE)
  }

  function handleTriageComplete(answers) {
    setTriageAnswers(answers)
    setStage(resolveStage(answers))
    setStep(STEPS.STAGE)
  }

  function handleStageComplete(stageAnswers) {
    const computedResult = buildAssessmentResult(stage, stageAnswers)
    const saved = saveSubmission({ lead, triageAnswers, stageAnswers, result: computedResult })
    setResult(computedResult)
    setSubmission(saved)
    setStep(STEPS.RESULTS)
  }

  return (
    <main className="flex flex-1 flex-col">
      {step === STEPS.WELCOME && <Welcome onStart={() => setStep(STEPS.LEAD)} />}
      {step === STEPS.LEAD && <LeadForm onSubmit={handleLeadSubmit} />}
      {step === STEPS.TRIAGE && <Triage onComplete={handleTriageComplete} />}
      {step === STEPS.STAGE && <StageForm stage={stage} onComplete={handleStageComplete} />}
      {step === STEPS.RESULTS && result && (
        <Results lead={lead} result={result} submission={submission} />
      )}
    </main>
  )
}

export default App

import { useState } from 'react'
import { steps } from './data/steps'
import StepCard from './components/StepCard'
import EmotionPicker from './components/EmotionPicker'
import Summary from './components/Summary'

function App() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const handleSubmit = (answer: string) => {
    const step = steps[stepIndex]
    const next = { ...answers, [step.id]: answer }
    setAnswers(next)

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      setDone(true)
    }
  }

  const handleRestart = () => {
    setStepIndex(0)
    setAnswers({})
    setDone(false)
  }

  const currentStep = steps[stepIndex]
  const isEmotionStep = currentStep?.id === 'emotion'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">
          不要慌
        </h1>

        {done ? (
          <Summary answers={answers} onRestart={handleRestart} />
        ) : isEmotionStep ? (
          <EmotionPicker
            key="emotion"
            stepIndex={stepIndex}
            totalSteps={steps.length}
            onSubmit={handleSubmit}
          />
        ) : (
          <StepCard
            key={currentStep.id}
            step={currentStep}
            stepIndex={stepIndex}
            totalSteps={steps.length}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  )
}

export default App

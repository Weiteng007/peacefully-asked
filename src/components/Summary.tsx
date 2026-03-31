import { steps } from '../data/steps'

interface Props {
  answers: Record<string, string>
  onRestart: () => void
}

export default function Summary({ answers, onRestart }: Props) {
  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4 text-3xl">
          🌱
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          你完成了一次觉察
        </h2>
        <p className="text-gray-400">
          回看你刚才的思考，感受有没有一点不同
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4 mb-10">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="bg-surface-light/60 border border-white/5 rounded-2xl p-5 animate-fade-in-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{step.icon}</span>
              <span className="text-sm text-gray-500">{step.title}</span>
            </div>
            <p className="text-white leading-relaxed whitespace-pre-wrap">
              {answers[step.id] || ''}
            </p>
          </div>
        ))}
      </div>

      {/* Action */}
      <div className="text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl
                     transition-all duration-200 cursor-pointer
                     hover:shadow-lg hover:shadow-primary/25"
        >
          再记录一次
        </button>
      </div>
    </div>
  )
}

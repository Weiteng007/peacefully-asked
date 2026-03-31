import { useState, useEffect } from 'react'
import { basicEmotions, complexEmotions, type EmotionCategory } from '../data/emotions'

interface Props {
  stepIndex: number
  totalSteps: number
  onSubmit: (answer: string) => void
}

function CategoryCard({
  category,
  selected,
  onToggle,
  delay,
}: {
  category: EmotionCategory
  selected: Set<string>
  onToggle: (emotion: string) => void
  delay: number
}) {
  const hasSelected = category.emotions.some((e) => selected.has(e))

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br p-4 transition-all duration-300 animate-fade-in-up
                  ${category.color}
                  ${hasSelected ? 'ring-1 ring-white/20' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{category.icon}</span>
        <span className="text-white text-sm font-medium">{category.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.emotions.map((emotion) => {
          const isActive = selected.has(emotion)
          return (
            <button
              key={emotion}
              onClick={() => onToggle(emotion)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 cursor-pointer
                ${isActive
                  ? `${category.tagColor} font-medium scale-105`
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-200'
                }`}
            >
              {emotion}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function EmotionPicker({ stepIndex, totalSteps, onSubmit }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [visible, setVisible] = useState(false)
  const [showComplex, setShowComplex] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const toggle = (emotion: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(emotion)) next.delete(emotion)
      else next.add(emotion)
      return next
    })
  }

  const handleSubmit = () => {
    if (selected.size > 0) {
      onSubmit(Array.from(selected).join('、'))
    }
  }

  return (
    <div className={`transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                i < stepIndex ? 'bg-primary w-full' : i === stepIndex ? 'bg-primary/60 w-1/2' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🫀</span>
        <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">
          第 {stepIndex + 1} 步 / 共 {totalSteps} 步
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
        你现在的情绪是什么？
      </h2>
      <p className="text-gray-400 mb-6">
        可以选多个，试着精确地描述你的感受
      </p>

      {/* Selected tags preview */}
      {selected.size > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 p-3 bg-surface-light/40 rounded-xl">
          {Array.from(selected).map((e) => (
            <span
              key={e}
              onClick={() => toggle(e)}
              className="px-3 py-1 rounded-full text-sm bg-primary/20 text-primary border border-primary/30
                         cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-colors"
            >
              {e} ×
            </span>
          ))}
        </div>
      )}

      {/* Basic emotions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {basicEmotions.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            category={cat}
            selected={selected}
            onToggle={toggle}
            delay={i * 60}
          />
        ))}
      </div>

      {/* Toggle complex emotions */}
      <button
        onClick={() => setShowComplex(!showComplex)}
        className="w-full text-center text-sm text-gray-500 hover:text-gray-300 py-2 cursor-pointer transition-colors"
      >
        {showComplex ? '收起更多情绪 ↑' : '展开更多复杂情绪 ↓'}
      </button>

      {showComplex && (
        <div className="grid gap-3 mt-2">
          {complexEmotions.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              selected={selected}
              onToggle={toggle}
              delay={i * 60}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-gray-600 text-sm">
          {selected.size > 0 && `已选 ${selected.size} 个`}
        </span>
        <button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className="px-7 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all duration-200 cursor-pointer
                     hover:shadow-lg hover:shadow-primary/25"
        >
          下一步
        </button>
      </div>
    </div>
  )
}

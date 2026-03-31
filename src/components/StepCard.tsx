import { useState, useEffect, useRef, useCallback } from 'react'
import type { Step } from '../data/steps'

interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } }; length: number }
  resultIndex: number
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start(): void
  stop(): void
  onresult: ((ev: SpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: ((ev: { error: string }) => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
}

function getSpeechRecognition(): SpeechRecognitionInstance | null {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) return null
  const recognition = new SR()
  recognition.lang = 'zh-CN'
  recognition.continuous = true
  recognition.interimResults = true
  return recognition
}

interface Props {
  step: Step
  stepIndex: number
  totalSteps: number
  onSubmit: (answer: string) => void
}

export default function StepCard({ step, stepIndex, totalSteps, onSubmit }: Props) {
  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false)
  const [listening, setListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const baseTextRef = useRef('')

  useEffect(() => {
    setText('')
    setVisible(false)
    setListening(false)
    baseTextRef.current = ''
    recognitionRef.current?.stop()
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [step.id])

  useEffect(() => {
    if (visible) textareaRef.current?.focus()
  }, [visible])

  useEffect(() => {
    return () => { recognitionRef.current?.stop() }
  }, [])

  const toggleListening = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const recognition = getSpeechRecognition()
    if (!recognition) {
      alert('你的浏览器不支持语音识别，请使用 Chrome')
      return
    }

    baseTextRef.current = text
    recognitionRef.current = recognition

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = ''
      let final = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if ((event.results[i] as unknown as { isFinal: boolean }).isFinal) {
          final += transcript
        } else {
          interim += transcript
        }
      }
      setText(baseTextRef.current + final + interim)
      if (final) {
        baseTextRef.current = baseTextRef.current + final
      }
    }

    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.start()
    setListening(true)
  }, [listening, text])

  const handleSubmit = () => {
    recognitionRef.current?.stop()
    if (text.trim()) onSubmit(text.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey && text.trim()) {
      handleSubmit()
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

      {/* Icon & step number */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{step.icon}</span>
        <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">
          第 {stepIndex + 1} 步 / 共 {totalSteps} 步
        </span>
      </div>

      {/* Question */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
        {step.title}
      </h2>
      <p className="text-gray-400 mb-8">
        {step.subtitle}
      </p>

      {/* Input area */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            baseTextRef.current = e.target.value
          }}
          onKeyDown={handleKeyDown}
          placeholder={step.placeholder}
          rows={5}
          className="w-full bg-surface-light/60 border border-white/5 rounded-2xl p-5 pr-14
                     text-white text-base leading-relaxed resize-none
                     placeholder:text-gray-600
                     focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20
                     transition-all"
        />

        {/* Mic button */}
        <button
          onClick={toggleListening}
          className={`absolute right-3 bottom-3 w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-200 cursor-pointer
                      ${listening
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse-ring'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
          title={listening ? '停止语音输入' : '开始语音输入'}
        >
          {listening ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          )}
        </button>
      </div>

      {/* Listening hint */}
      {listening && (
        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          正在听你说...
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-5">
        <span className="text-gray-600 text-sm">
          {text.length > 0 && `${text.length} 字`}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-xs hidden sm:block">⌘ + Enter</span>
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="px-7 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-200 cursor-pointer
                       hover:shadow-lg hover:shadow-primary/25"
          >
            {stepIndex < totalSteps - 1 ? '下一步' : '完成'}
          </button>
        </div>
      </div>
    </div>
  )
}

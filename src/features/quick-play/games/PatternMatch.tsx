import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'

const SHAPES = ['🔴', '🔵', '🟢', '🟡']

function generatePattern(length = 5): string[] {
  return Array.from({ length }, () => SHAPES[Math.floor(Math.random() * SHAPES.length)])
}

function generateOptions(correct: string): string[] {
  const others = SHAPES.filter(s => s !== correct)
  const wrong1 = others[Math.floor(Math.random() * others.length)]
  const wrong2 = others.filter(s => s !== wrong1)[Math.floor(Math.random() * (others.length - 1))]
  return [correct, wrong1, wrong2].sort(() => Math.random() - 0.5)
}

export function PatternMatch() {
  const { t } = useTranslation()
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(false)
  const [pattern, setPattern] = useState(() => generatePattern())
  const correct = pattern[pattern.length - 1]
  const displayPattern = pattern.slice(0, -1)
  const options = generateOptions(correct)

  const handleAnswer = (choice: string) => {
    if (choice === correct) {
      setScore(s => s + 1)
      setWrong(false)
      setPattern(generatePattern())
    } else {
      setWrong(true)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-lg font-bold text-gray-600">{t.quickPlay.pattern.score}: <span className="text-lumi-primary">{score}</span></div>
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <p className="text-sm text-gray-500 mb-4 text-center">Šta dolazi sledeće?</p>
        <div className="flex items-center gap-3 text-4xl justify-center">
          {displayPattern.map((s, i) => <span key={i}>{s}</span>)}
          <span className="text-gray-300 text-5xl">?</span>
        </div>
      </div>
      {wrong && <p className="text-red-500 font-bold">Pokušaj ponovo!</p>}
      <div className="flex gap-4">
        {options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)} className="w-16 h-16 text-3xl bg-white rounded-2xl shadow-card hover:shadow-warm hover:-translate-y-1 transition-all">
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

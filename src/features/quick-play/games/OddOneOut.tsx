import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'

const ROUNDS = [
  { items: ['🐶', '🐱', '🐭', '🚗'], odd: '🚗', hint: 'Jedno od toga nije životinja!' },
  { items: ['🍎', '🍊', '🍋', '🥦'], odd: '🥦', hint: 'Jedno od toga nije voće!' },
  { items: ['🔴', '🔵', '🟡', '🎵'], odd: '🎵', hint: 'Jedno od toga nije boja!' },
  { items: ['⬛', '🔺', '⭕', '🐸'], odd: '🐸', hint: 'Jedno od toga nije oblik!' },
  { items: ['✈️', '🚀', '🚗', '🚁'], odd: '🚗', hint: 'Jedno od toga ne leti!' },
]

export function OddOneOut() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<string | null>(null)
  const round = ROUNDS[index % ROUNDS.length]

  const handleClick = (item: string) => {
    if (answered) return
    setAnswered(item)
    if (item === round.odd) {
      setScore(s => s + 1)
    }
  }

  const next = () => {
    setAnswered(null)
    setIndex(i => i + 1)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-lg font-bold text-gray-600">{t.quickPlay.oddone.score}: <span className="text-lumi-primary">{score}</span></div>
      <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-sm">
        <p className="text-sm text-gray-500 mb-6 text-center">{round.hint}</p>
        <div className="grid grid-cols-2 gap-4">
          {round.items.map((item, i) => {
            let cls = 'w-full h-20 text-4xl rounded-2xl shadow-card transition-all hover:-translate-y-1'
            if (answered) {
              if (item === round.odd) cls += ' bg-green-100 scale-110'
              else if (item === answered && item !== round.odd) cls += ' bg-red-100 opacity-60'
              else cls += ' bg-white opacity-60'
            } else {
              cls += ' bg-lumi-warm hover:bg-lumi-warm-dark'
            }
            return (
              <button key={i} onClick={() => handleClick(item)} className={cls}>{item}</button>
            )
          })}
        </div>
      </div>
      {answered && (
        <div className="text-center space-y-2">
          <p className={`font-bold text-lg ${answered === round.odd ? 'text-green-600' : 'text-red-500'}`}>
            {answered === round.odd ? t.quickPlay.oddone.correct + ' 🎉' : t.quickPlay.oddone.wrong}
          </p>
          <button onClick={next} className="btn-primary">{t.quickPlay.oddone.playAgain}</button>
        </div>
      )}
    </div>
  )
}

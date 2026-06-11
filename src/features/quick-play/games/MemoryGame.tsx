import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'

const EMOJIS = ['🌟', '🎨', '🎵', '🌈', '🦋', '🌸', '🎯', '🏆']

interface Card {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

function createDeck(): Card[] {
  const cards = [...EMOJIS, ...EMOJIS].map((emoji, i) => ({
    id: i, emoji, flipped: false, matched: false,
  }))
  return cards.sort(() => Math.random() - 0.5)
}

export function MemoryGame() {
  const { t } = useTranslation()
  const [cards, setCards] = useState<Card[]>(createDeck())
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  const matched = cards.filter(c => c.matched).length / 2

  const handleClick = (id: number) => {
    if (locked || selected.length === 2) return
    const card = cards.find(c => c.id === id)
    if (!card || card.flipped || card.matched) return
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c)
    setCards(newCards)
    const newSelected = [...selected, id]
    setSelected(newSelected)
    if (newSelected.length === 2) {
      setMoves(m => m + 1)
      setLocked(true)
      const [a, b] = newSelected.map(sid => newCards.find(c => c.id === sid)!)
      setTimeout(() => {
        if (a.emoji === b.emoji) {
          setCards(prev => prev.map(c => newSelected.includes(c.id) ? { ...c, matched: true } : c))
        } else {
          setCards(prev => prev.map(c => newSelected.includes(c.id) ? { ...c, flipped: false } : c))
        }
        setSelected([])
        setLocked(false)
      }, 800)
    }
  }

  const reset = () => { setCards(createDeck()); setSelected([]); setMoves(0); setLocked(false) }

  const won = matched === EMOJIS.length

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6 text-sm font-bold text-gray-600">
        <span>{t.quickPlay.memory.moves}: {moves}</span>
        <span>{t.quickPlay.memory.pairs}: {matched}/{EMOJIS.length}</span>
      </div>
      {won && <p className="text-xl font-extrabold text-lumi-primary">{t.quickPlay.memory.youWon} 🎉</p>}
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`w-16 h-16 rounded-2xl text-2xl flex items-center justify-center shadow-card transition-all duration-300 ${
              card.flipped || card.matched
                ? 'bg-white rotate-0 scale-100'
                : 'bg-lumi-primary hover:bg-lumi-primary/80 text-transparent'
            } ${card.matched ? 'opacity-50' : ''}`}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
      <button onClick={reset} className="btn-secondary">{t.quickPlay.memory.playAgain}</button>
    </div>
  )
}

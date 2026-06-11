import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'
import { TicTacToe } from '../games/TicTacToe'
import { MemoryGame } from '../games/MemoryGame'
import { PatternMatch } from '../games/PatternMatch'
import { OddOneOut } from '../games/OddOneOut'

type GameId = 'tictactoe' | 'memory' | 'pattern' | 'oddone'

const GAME_ICONS: Record<GameId, string> = {
  tictactoe: '❌',
  memory: '🃏',
  pattern: '🎨',
  oddone: '🔍',
}

export function QuickPlayPage() {
  const { t } = useTranslation()
  const [activeGame, setActiveGame] = useState<GameId | null>(null)

  const games: GameId[] = ['tictactoe', 'memory', 'pattern', 'oddone']

  const renderGame = () => {
    switch (activeGame) {
      case 'tictactoe': return <TicTacToe />
      case 'memory': return <MemoryGame />
      case 'pattern': return <PatternMatch />
      case 'oddone': return <OddOneOut />
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">{t.quickPlay.title}</h1>
        <p className="text-gray-500 text-lg">{t.quickPlay.subtitle}</p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {games.map(id => (
            <button
              key={id}
              onClick={() => setActiveGame(id)}
              className="bg-white rounded-3xl shadow-card p-8 text-left hover:shadow-warm hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4">{GAME_ICONS[id]}</div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-2">{t.quickPlay.games[id].name}</h3>
              <p className="text-gray-500">{t.quickPlay.games[id].description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setActiveGame(null)} className="text-lumi-primary font-bold mb-6 hover:underline flex items-center gap-2">
            ← {t.quickPlay.backToGames}
          </button>
          <div className="bg-white rounded-3xl shadow-card p-8">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-8 text-center">
              {GAME_ICONS[activeGame]} {t.quickPlay.games[activeGame].name}
            </h2>
            {renderGame()}
          </div>
        </div>
      )}
    </div>
  )
}

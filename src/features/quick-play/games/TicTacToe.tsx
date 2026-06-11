import { useState } from 'react'
import { useTranslation } from '../../../i18n/useTranslation'

type Cell = 'X' | 'O' | null
const WINNING_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

function checkWinner(board: Cell[]): Cell {
  for (const [a,b,c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  return null
}

export function TicTacToe() {
  const { t } = useTranslation()
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [isX, setIsX] = useState(true)

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  const handleClick = (i: number) => {
    if (board[i] || winner) return
    const next = [...board]
    next[i] = isX ? 'X' : 'O'
    setBoard(next)
    setIsX(!isX)
  }

  const reset = () => { setBoard(Array(9).fill(null)); setIsX(true) }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        {winner ? (
          <p className="text-2xl font-extrabold text-lumi-primary">{winner === 'X' ? t.quickPlay.tictactoe.winsX : t.quickPlay.tictactoe.winsO}</p>
        ) : isDraw ? (
          <p className="text-2xl font-extrabold text-lumi-accent">{t.quickPlay.tictactoe.draw}</p>
        ) : (
          <p className="text-lg font-bold text-gray-600">{t.quickPlay.tictactoe.turn}: <span className="text-lumi-primary">{isX ? 'X' : 'O'}</span></p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 rounded-2xl text-3xl font-extrabold transition-all ${
              cell === 'X' ? 'bg-lumi-primary-light text-lumi-primary' :
              cell === 'O' ? 'bg-lumi-secondary-light text-lumi-secondary' :
              'bg-lumi-warm hover:bg-lumi-warm-dark'
            } shadow-card`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={reset} className="btn-secondary">{t.quickPlay.tictactoe.newGame}</button>
    </div>
  )
}

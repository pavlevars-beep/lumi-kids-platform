import { useEffect, useRef, useState } from 'react'
import { Music, Pause, Play } from 'lucide-react'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
    audio.loop = true
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <audio ref={audioRef} src="/lumikids-tema.mp3" preload="auto" />
      <button
        onClick={toggle}
        title={playing ? 'Pauziraj muziku' : 'Pusti muziku'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
          playing
            ? 'bg-lumi-blue text-white shadow-glow'
            : 'bg-lumi-warm-dark text-lumi-dark-blue hover:bg-lumi-blue hover:text-white'
        }`}
      >
        <Music className={`w-3.5 h-3.5 ${playing ? 'animate-pulse' : ''}`} />
        {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        <span className="hidden sm:inline">{playing ? 'Muzika' : 'Muzika'}</span>
      </button>
    </div>
  )
}

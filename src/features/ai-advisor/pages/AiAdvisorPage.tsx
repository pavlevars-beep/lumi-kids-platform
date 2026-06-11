import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { askAdvisor } from '../services/aiAdvisorService'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Moje dete je došlo uznemireno iz škole.',
  'Moje dete je danas jako tvrdoglavo.',
  'Kako da postavim granicu bez vikanja?',
  'Moje dete pokazuje poseban talenat.',
  'Kako da pomognem detetu da se smiri?',
]

const GREETING: Message = {
  role: 'assistant',
  content: 'Zdravo! Ja sam vaš AI savetnik. Opišite situaciju i pokušaću da vam pomognem sa toplim i praktičnim savetom. Podsetiću vas – za ozbiljna pitanja uvek potražite stručnu pomoć.',
}

export function AiAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text?: string) => {
    const q = text ?? input.trim()
    if (!q || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: q }])
    setLoading(true)
    try {
      const answer = await askAdvisor(q)
      setMessages(prev => [...prev, { role: 'assistant', content: answer }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Došlo je do greške. Pokušajte ponovo.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="section-title">AI savetnik za roditelje</h1>
        <p className="section-subtitle">Topla, praktična podrška u svakodnevnim roditeljskim situacijama</p>
      </div>

      <div className="card overflow-hidden flex flex-col" style={{ height: '60vh', minHeight: 400 }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs sm:max-w-md rounded-2xl px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-lumi-primary text-white rounded-br-sm'
                    : 'bg-lumi-warm text-lumi-dark rounded-bl-sm border border-lumi-warm-dark'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-lumi-warm rounded-2xl rounded-bl-sm px-5 py-4 border border-lumi-warm-dark">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-lumi-muted animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="text-xs bg-lumi-secondary-light text-lumi-secondary font-medium px-3 py-2 rounded-full hover:bg-lumi-secondary hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-gray-100 p-4">
          <div className="flex gap-3">
            <textarea
              className="flex-1 resize-none input-field py-3 min-h-[48px] max-h-32"
              placeholder="Opišite situaciju sa vašim detetom..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="bg-lumi-primary text-white p-3 rounded-xl hover:bg-lumi-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Pošalji"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AI-generated guidance. Use at your own discretion. The app creators are not responsible for decisions based on this content.
          </p>
        </div>
      </div>
    </div>
  )
}

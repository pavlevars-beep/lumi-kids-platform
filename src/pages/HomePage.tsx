import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Star, Heart, Zap } from 'lucide-react'
import { workshopService } from '../features/workshops/services/workshopService'
import { articleService } from '../features/articles/services/articleService'
import { WorkshopCard } from '../features/workshops/components/WorkshopCard'
import { ArticleCard } from '../features/articles/components/ArticleCard'
import type { Workshop } from '../features/workshops/types'
import type { Article } from '../features/articles/types'

export function HomePage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    workshopService.getPublished().then(data => setWorkshops(data.slice(0, 3))).catch(() => {})
    articleService.getPublished().then(data => setArticles(data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-lumi-warm via-lumi-primary-light to-lumi-secondary-light py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-4 shadow-warm">
              <Sparkles className="w-12 h-12 text-lumi-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            Gde dečja radoznalost postaje znanje
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            LumiKids Studio je toplo mesto za radoznalu decu i roditelje koji žele podršku, inspiraciju i smislen razvoj kroz igru, stvaranje i učenje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/workshops" className="btn-primary text-lg px-8 py-4">
              🎨 Pogledaj radionice
            </Link>
            <Link to="/quick-play" className="btn-secondary text-lg px-8 py-4">
              🎮 Brza igra
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-lumi-accent" /> Stručni tim</span>
            <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-lumi-primary" /> Deca na prvom mestu</span>
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-lumi-secondary" /> Interaktivno učenje</span>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Naša filozofija</h2>
          <p className="text-gray-500 text-lg mb-12">Verujemo da deca rastu najlepše kroz radoznalost, igru i emocionalnu sigurnost</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔍', title: 'Radoznalost, ne pritisak', desc: 'Deca uče kroz otkrivanje, ne kroz obavezu.' },
              { icon: '💛', title: 'Emocionalna sigurnost', desc: 'Svako dete treba da se oseća prihvaćeno i sigurno.' },
              { icon: '🎨', title: 'Stvaralaštvo', desc: 'Kreativnost razvija samopouzdanje i rešavanje problema.' },
              { icon: '🤝', title: 'Svesno roditeljstvo', desc: 'Roditelji zaslužuju podršku, a ne osude.' },
            ].map(p => (
              <div key={p.title} className="bg-lumi-warm rounded-3xl p-6 text-center">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-extrabold text-gray-800 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Workshops */}
      {workshops.length > 0 && (
        <section className="py-16 px-4 bg-lumi-warm/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-extrabold text-gray-800">Nadolazeće radionice</h2>
              <Link to="/workshops" className="text-lumi-primary font-bold hover:underline">Sve radionice →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map(w => <WorkshopCard key={w.id} workshop={w} />)}
            </div>
          </div>
        </section>
      )}

      {/* Parent Support */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Podrška za roditelje</h2>
          <p className="text-gray-500 text-lg mb-8">Praktični tekstovi i AI savetnik koji vam pomaže u svakodnevnim situacijama</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/articles" className="btn-secondary px-8 py-3">📚 Čitaj tekstove</Link>
            <Link to="/ai-advisor" className="btn-primary px-8 py-3">🤖 Pitaj AI savetnika</Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {articles.length > 0 && (
        <section className="py-16 px-4 bg-lumi-warm/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-extrabold text-gray-800">Korisni tekstovi</h2>
              <Link to="/articles" className="text-lumi-primary font-bold hover:underline">Svi tekstovi →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-lumi-primary to-red-400">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Probajte AI savetnika besplatno!</h2>
          <p className="mb-8 opacity-90">Dobijte personalizovane savete za razvoj vašeg deteta</p>
          <Link to="/ai-advisor" className="bg-white text-lumi-primary font-extrabold px-8 py-4 rounded-2xl hover:shadow-lg transition-all inline-block">
            Otvorite AI savetnika →
          </Link>
        </div>
      </section>
    </div>
  )
}

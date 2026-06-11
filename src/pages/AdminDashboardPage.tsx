import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Newspaper, Plus, TrendingUp } from 'lucide-react'
import { workshopService } from '../features/workshops/services/workshopService'
import { articleService } from '../features/articles/services/articleService'

interface Stats {
  workshopsTotal: number
  workshopsPublished: number
  articlesTotal: number
  articlesPublished: number
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ workshopsTotal: 0, workshopsPublished: 0, articlesTotal: 0, articlesPublished: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([workshopService.getAll(), articleService.getAll()])
      .then(([workshops, articles]) => {
        setStats({
          workshopsTotal: workshops.length,
          workshopsPublished: workshops.filter(w => w.status === 'published').length,
          articlesTotal: articles.length,
          articlesPublished: articles.filter(a => a.status === 'published').length,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    {
      title: 'Radionice',
      total: stats.workshopsTotal,
      published: stats.workshopsPublished,
      icon: BookOpen,
      color: 'bg-lumi-primary-light text-lumi-primary',
      link: '/admin/workshops',
      newLink: '/admin/workshops/new',
    },
    {
      title: 'Tekstovi',
      total: stats.articlesTotal,
      published: stats.articlesPublished,
      icon: Newspaper,
      color: 'bg-lumi-secondary-light text-lumi-secondary',
      link: '/admin/articles',
      newLink: '/admin/articles/new',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-8">Dashboard</h1>
      {loading ? (
        <div className="text-lumi-primary font-bold animate-pulse">Učitavanje...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(card => (
            <div key={card.title} className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <Link to={card.newLink} className="btn-primary flex items-center gap-2 !py-2 !px-4 !text-sm">
                  <Plus className="w-3 h-3" />
                  Novi
                </Link>
              </div>
              <h3 className="text-lg font-extrabold text-gray-800 mb-4">{card.title}</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-lumi-warm rounded-xl p-3 text-center">
                  <p className="text-2xl font-extrabold text-gray-800">{card.total}</p>
                  <p className="text-xs text-gray-500">Ukupno</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-extrabold text-green-600">{card.published}</p>
                  <p className="text-xs text-gray-500">Objavljeno</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-extrabold text-gray-400">{card.total - card.published}</p>
                  <p className="text-xs text-gray-500">Nacrti</p>
                </div>
              </div>
              <Link to={card.link} className="mt-4 text-lumi-primary font-bold text-sm hover:underline flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Pogledaj sve
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

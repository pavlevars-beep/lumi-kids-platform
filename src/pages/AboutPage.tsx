import { Heart, Users } from 'lucide-react'

const values = [
  { icon: '🎨', label: 'Kreativnost', color: 'bg-lumi-primary-light' },
  { icon: '😄', label: 'Radost', color: 'bg-yellow-100' },
  { icon: '🌱', label: 'Rast', color: 'bg-green-100' },
  { icon: '👨‍👩‍👧', label: 'Zajednica', color: 'bg-lumi-secondary-light' },
]

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">O nama</h1>
        <div className="w-16 h-1 bg-lumi-primary rounded-full mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-3xl shadow-card p-8">
          <div className="w-12 h-12 bg-lumi-primary-light rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-lumi-primary" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-3">Naša misija</h2>
          <p className="text-gray-600 leading-relaxed">
            LumiKids Studio je toplo i podsticajno mesto gde deca kroz igru, stvaralaštvo i radoznalost razvijaju samopouzdanje, emocionalnu inteligenciju i ljubav prema učenju.
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-8">
          <div className="w-12 h-12 bg-lumi-secondary-light rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-lumi-secondary" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-3">Naš tim</h2>
          <p className="text-gray-600 leading-relaxed">
            Naš tim čine edukatori, psiholozi i kreativni pedagozi koji veruju da svako dete ima jedinstveni talenat koji čeka da bude otkriveno.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card p-8">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Naše vrednosti</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {values.map(v => (
            <div key={v.label} className={`${v.color} rounded-2xl p-6 text-center`}>
              <div className="text-4xl mb-3">{v.icon}</div>
              <p className="font-extrabold text-gray-800">{v.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-lumi-primary to-red-400 rounded-3xl p-8 text-white text-center">
        <h2 className="text-2xl font-extrabold mb-3">Pridružite se LumiKids zajednici!</h2>
        <p className="opacity-90">Više od 500 porodica već veruje u LumiKids metod kreativnog učenja</p>
      </div>
    </div>
  )
}

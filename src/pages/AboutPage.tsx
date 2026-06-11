import { Heart, Users, Sparkles, Star } from 'lucide-react'

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

      <div className="bg-white rounded-3xl shadow-card p-8 mb-8">
        <div className="w-12 h-12 bg-lumi-primary-light rounded-2xl flex items-center justify-center mb-5">
          <Sparkles className="w-6 h-6 text-lumi-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Kako je sve počelo</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          LumiKids Studio je nastao iz jedne jednostavne, ali duboko osećene potrebe — da roditeljima i deci ponudimo nešto što u svakodnevnoj gužvi često nedostaje: kvalitetno zajedničko vreme i aktivnosti koje zaista nešto znače. Ne prolazna zabava, nego iskustvo koje ostaje — koje razvija, inspiriše i gradi.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Primetili smo da deca imaju sve više sadržaja, a sve manje prostora za pravo istraživanje — igru koja ima smisao, stvaranje koje dolazi iznutra, radoznalost koja se ne gasi pritiskom. LumiKids je odgovor na to. Mesto gde dete dolazi da bude ono što jeste, i odlazi malo bogatije nego što je stiglo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-3xl shadow-card p-8">
          <div className="w-12 h-12 bg-lumi-primary-light rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-lumi-primary" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-3">Naša misija</h2>
          <p className="text-gray-600 leading-relaxed">
            Verujemo da su detinjstvo i porodično vreme dragoceni. Naša misija je da svaka radionica, svaka aktivnost i svaki susret bude nešto na šta se dete raduje — i što roditelja podseća zašto je sve ovo vredno.
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-8">
          <div className="w-12 h-12 bg-lumi-secondary-light rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-lumi-secondary" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-3">Naš tim</h2>
          <p className="text-gray-600 leading-relaxed">
            Tim LumiKidsa čine mladi, posvećeni stručnjaci — pedagozi, psiholozi, kreativni edukatori — od kojih su mnogi i sami roditelji. U radu sa decom pre svega uživaju, i iz tog mesta dolazi sve što radimo.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-card p-8 mb-8">
        <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mb-5">
          <Star className="w-6 h-6 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Zašto nam je stalo</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Svako od nas u timu nosi lično iskustvo — kao roditelj, kao dete koje je jednom i samo nešto volelo da radi, kao stručnjak koji je video šta se desi kada dete dobije prostor da raste na pravi način. Taj lični odnos prema radu nije dekoracija — on je razlog zbog kojeg ujutru dolazimo.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Želimo da deca koja prođu kroz LumiKids odrastu u ljude koji znaju šta vole, koji nisu uplašeni od greške, koji umeju da sarađuju i koji nose lepe uspomene na odrastanje. I da roditelji, gledajući ih, osete da su napravili dobar izbor.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-card p-8 mb-8">
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
        <p className="opacity-90">Radujemo se svakoj porodici koja postane deo naše priče.</p>
      </div>
    </div>
  )
}

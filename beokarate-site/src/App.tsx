import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FindClub from './pages/FindClub'
import Parents from './pages/Parents'
import ParentArticle from './pages/ParentArticle'
import Competitions from './pages/Competitions'
import Results from './pages/Results'
import Membership from './pages/Membership'
import Coaches from './pages/Coaches'
import SafeKarate from './pages/SafeKarate'
import About from './pages/About'
import Media from './pages/Media'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pronadji-klub" element={<FindClub />} />
        <Route path="/za-roditelje" element={<Parents />} />
        <Route path="/za-roditelje/:slug" element={<ParentArticle />} />
        <Route path="/takmicenja" element={<Competitions />} />
        <Route path="/rezultati" element={<Results />} />
        <Route path="/clanstvo" element={<Membership />} />
        <Route path="/treneri-i-sudije" element={<Coaches />} />
        <Route path="/bezbedan-karate" element={<SafeKarate />} />
        <Route path="/o-nama" element={<About />} />
        <Route path="/media-i-partneri" element={<Media />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

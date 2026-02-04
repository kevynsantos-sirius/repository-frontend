import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login.tsx'
import Home from './pages/Home/Home.tsx'
import Identificacao from './pages/Identificacao/Identificacao.tsx'
import TI from './pages/TI/TI.tsx'
import Checklists from './pages/Checklists/Checklists.tsx'
import Modelo from './pages/Modelo/Modelo.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/identificacao" element={<Identificacao />} />
      <Route path="/ti" element={<TI />} />
      <Route path="/checklists" element={<Checklists />} />
      <Route path="/modelo" element={<Modelo />} />
    </Routes>
  )
}

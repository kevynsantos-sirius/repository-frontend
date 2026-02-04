import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Identificacao from './pages/Identificacao/Identificacao'
import TI from './pages/TI/TI'
import Checklists from './pages/Checklists/Checklists'
import Modelo from './pages/Modelo/Modelo'

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

import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Checklists from './pages/Checklists/Checklists'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/checklists" element={<Checklists />} />
    </Routes>
  )
}

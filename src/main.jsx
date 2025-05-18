import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Detail from './components/Detail.jsx'
import Users from './components/Users.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/react-mini-apps" element={<App />} />
      <Route path="/react-mini-apps/about" element={<About />} />
      <Route path="/react-mini-apps/contact" element={<Contact />} />
      <Route path="/react-mini-apps/article/:id" element={<Detail />} />
      <Route path="/react-mini-apps/users" element={<Users />} />
    </Routes>
    
    </BrowserRouter>
  </StrictMode>,
)

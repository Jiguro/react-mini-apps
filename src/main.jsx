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
      <Route path="/react-mini-apps">
        <Route index element={<App />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="article/:id" element={<Detail />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
    
    </BrowserRouter>
  </StrictMode>,
)

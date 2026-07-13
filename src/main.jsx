import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Tipografía corporativa Celeren (ver Manual de marca, 1.6): Montserrat
// Regular/Medium para texto, Semibold para títulos, Light Italic para enlaces/estilizado.
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/300-italic.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

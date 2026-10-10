import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/global.css'
import App from './App.jsx'
import { applyCabinetTheme } from './utils/applyCabinetTheme.js'

// Load the current cabinet's colours before the page is drawn.
applyCabinetTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

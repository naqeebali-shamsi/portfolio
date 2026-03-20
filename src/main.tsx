import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/inter/latin-400.css'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

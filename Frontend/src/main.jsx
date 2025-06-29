import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>CodeJudge</h1>
    <h3>Write code in any language — it will tell the correct code and give suggestions.</h3>
    <App />
  </StrictMode>,
)
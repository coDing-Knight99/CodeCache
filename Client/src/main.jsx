import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <App />
    </StrictMode>
  </BrowserRouter>,
)

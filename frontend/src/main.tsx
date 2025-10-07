import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'antd/dist/reset.css'  // This is important!
import { HospitalProvider } from './contexts/HospitalContext'
// import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HospitalProvider>
        <App />
      </HospitalProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
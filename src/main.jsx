import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CredentialDataProvider } from './context/CredentialContext.jsx'
// import { disableReactDevTools } from '@fvilers/disable-react-devtools'

// if (process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredentialDataProvider>
      <App />
    </CredentialDataProvider>
  </React.StrictMode>,
)

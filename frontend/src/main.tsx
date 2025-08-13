import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'antd/dist/reset.css'  // This is important!
import { AuthProvider } from "react-oidc-context";
import AxiosProvider from './services/api/AxiosProvider'

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_Kp4EsFsRG",
  client_id: "6fsimfpu0tjvdrqun6c4veno48",
  redirect_uri: "http://localhost:3000/doctordashboard",
  // logout_uri: 'http://localhost:3000',
  response_type: "code",
  scope: "phone openid email",
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <AxiosProvider>
          <App />
        </AxiosProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
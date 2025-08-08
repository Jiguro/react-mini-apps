import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain = {import.meta.env.VITE_AUTH0_DOMAIN}
    clientId = {import.meta.env.VITE_AUTH0_CLIENT_ID}
    useRefreshTokens = {true}
    cacheLocation="memory"
    authorizationParams = {{
      redirect_uri: window.location.origin,
      audience: "https://dev-fei5o32deyyjp7oq.us.auth0.com/api/v2/",
    }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </Auth0Provider>,
)

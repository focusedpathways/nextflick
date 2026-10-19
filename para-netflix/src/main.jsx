import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MyListProvider } from './context/MyListProvider.jsx'
import { WatchHistoryProvider } from './context/WatchHistoryProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyListProvider>
        <WatchHistoryProvider>
          <App />
        </WatchHistoryProvider>
      </MyListProvider>
    </BrowserRouter>
  </StrictMode>,
)

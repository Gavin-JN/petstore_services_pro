import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Top from './components/Top.jsx'
import Bottom from './components/bottom.jsx'
import Main from './components/Main.jsx'
import AppRoutes from './route/index.jsx'
import { BrowserRouter } from 'react-router-dom'
import Introduce from './pages/Introduct.jsx'
import { TipsProvider } from './util/TipsContext.jsx'

function App() {
  return (
      <BrowserRouter>
      <TipsProvider>
      <AppRoutes></AppRoutes>
      </TipsProvider>
      </BrowserRouter>
      
  )
}

export default App

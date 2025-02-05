import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import LoginSignup from './Components/Login/Login'


const App = () => {

  const routeData = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <LoginSignup />
    }
  ]

  return (
    <div>
      <Routes>
        {
          routeData.map((route) => {
            return (
              <Route path={route.path} element={route.element} />
            )
          })
        }
      </Routes>
    </div>
  )
}

export default App

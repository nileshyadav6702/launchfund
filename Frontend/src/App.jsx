import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login_Signup/Login'
import Signup from './Components/Login_Signup/Signup'


const App = () => {

  const routeData = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
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

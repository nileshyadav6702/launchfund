import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'


const App = () => {

  const routeData = [
    {
      path: '/',
      element: <Home />
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

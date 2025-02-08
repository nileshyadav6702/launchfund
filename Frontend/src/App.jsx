import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login_Signup/Login'
import Signup from './Components/Login_Signup/Signup'
import StartCampaign from './Components/Campaign/StartCampaign'
import CampaignList from './Components/Campaign/CampaignList'
import CampaignDetails from './Components/Campaign/CampaignDetails'
import MyCampaigns from './Components/Campaign/MyCampaigns'
import {Dataprovider} from './Components/Datacontext'

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
    },
    {
      path: '/start_campaign',
      element: <StartCampaign />
    },
    {
      path: '/explore',
      element: <CampaignList />
    },
    {
      path: '/campaign/:id',
      element: <CampaignDetails />
    },
    {
      path: '/my-campaigns',
      element: <MyCampaigns />
    }
  ]

  return (
    <div>
      <Dataprovider>
      <Routes>
        {
          routeData.map((route) => {
            return (
              <Route path={route.path} element={route.element} />
            )
          })
        }
      </Routes>

      </Dataprovider>
    </div>
  )
}

export default App

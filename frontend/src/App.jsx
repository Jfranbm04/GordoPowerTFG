import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { FoodProvider } from './context/FoodContext'

const App = () => {
  return (
    <AuthProvider>
      <FoodProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </FoodProvider>
    </AuthProvider>

  )
}

export default App
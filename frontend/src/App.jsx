import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { FoodProvider } from './context/FoodContext'
// import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <AuthProvider>
        <FoodProvider>
          <UserProvider>
            <RouterProvider router={router} />
            {/* <Toaster position="top-right" richColors duration="2000" /> */}
          </UserProvider>
        </FoodProvider>
      </AuthProvider>
    </>
  );
}

export default App
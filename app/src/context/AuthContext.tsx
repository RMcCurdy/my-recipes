import React, { createContext, useState } from 'react'

// Create a new context
export const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: (value: boolean) => {},
})

// Create a provider component
export const AuthProvider = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState<boolean>(true)

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

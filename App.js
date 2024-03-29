import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import Navigation from './Navigation/Navigation'
import { TokenContext, UsernameContext } from './Context/Context'

export default function App() {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState("")

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <StatusBar backgroundColor="#ffffff" barStyle='dark-content'></StatusBar>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
  );
}

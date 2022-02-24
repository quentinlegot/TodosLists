import React, { useContext } from 'react'
import {Text, View } from 'react-native'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function App() {
  const [ username, setUsername] = useContext(UsernameContext)
  const [ token, setToken] = useContext(TokenContext)
  setToken(null)
  setUsername("")
  return (
    <>
    </>
  );
}

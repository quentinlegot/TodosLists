import React, { useContext } from 'react'
import { Text } from 'react-native'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function HomeScreen() {
  const [username, setUsername] = useContext(UsernameContext)
  const [token, setToken] = useContext(TokenContext)
  return (
    <>
      <Text>Welcome !</Text>
      <Text>You are logged as {username}</Text>
    </>
  )
}

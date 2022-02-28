import React, { useContext, useEffect } from 'react'
import { Text } from 'react-native'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function TodoListScreen({ navigation, route }) {
    useEffect(() => {
        console.log(route.params?.title)
        navigation.setOptions({headerTitle: route.params?.taskList.title})
    }, [])
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken] = useContext(TokenContext)
    return (
    <>
      <Text>Welcome !</Text>
      <Text>You are logged as {username}</Text>
      <Text>{token}</Text>
    </>
  )
}

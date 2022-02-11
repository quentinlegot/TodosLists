import React, { useContext, useState } from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'
import signIn from '../components/SignIn.js'
import { UsernameContext, TokenContext } from '../Context/Context.js'


export default function SignInScreen() {
  const [ username, setUsername] = useContext(UsernameContext)
  const [ token, setToken] = useContext(TokenContext)
  const [ password, setPassword] = useState("")
  const [error, setError] = useState("")

  const signin = () => {
    signIn(username, password)
    .then(token => {
      setToken(token)
      setUsername(login)
      props.navigate('Home')
    })
    .catch(err => {
      setError(err)
    })
  }

  return (
    <>
      <Text>{error}</Text>
      <Text>Nom d'utilisateur:</Text>
      <TextInput value={username} onChangeText={setUsername} onSubmitEditing={signin} style={styles.input}></TextInput>
      <Text>Mot de passe:</Text>
      <TextInput value={password} onChangeText={setPassword} onSubmitEditing={signin} style={styles.input} secureTextEntry={true}></TextInput>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

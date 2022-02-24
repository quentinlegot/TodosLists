import React, { useContext, useState } from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import signUp from '../components/SignUp'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function SignUpScreen({ navigation }) {
  const [ username, setUsername] = useContext(UsernameContext)
  const [ token, setToken] = useContext(TokenContext)
  const [ password, setPassword] = useState("")
  const [error, setError] = useState("")

  const signup = () => {
    signUp(username, password)
    .then(token => {
      setToken(token)
      setUsername(username)
    }).catch(err => setError(err))
  }

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
      <Text>Token is {token  === undefined ? "undefined" : (token === null ? "null" : token)}</Text>
      <Text>username is {username}</Text>
      <Text>Nom d'utilisateur:</Text>
      <TextInput value={username} onChangeText={setUsername} onSubmitEditing={signup} style={styles.input}></TextInput>
      <Text>Mot de passe:</Text>
      <TextInput value={password} onChangeText={setPassword} onSubmitEditing={signup} style={styles.input} secureTextEntry={true}></TextInput>
      <View style={styles.button}>
        <Button onPress={signup} title="S'inscrire" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 30
  }
});

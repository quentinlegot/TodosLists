import React, { useContext, useState } from 'react'
import { Text, TextInput, StyleSheet, Button, View } from 'react-native'
import signIn from '../components/SignIn'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function SignInScreen({ navigation }) {
  const [ username, setUsername] = useContext(UsernameContext)
  const [ token, setToken] = useContext(TokenContext)
  const [ password, setPassword] = useState("")
  const [error, setError] = useState("")

  const signin = () => {
    signIn(username, password)
    .then(token => {
      setToken(token)
      setUsername(username)
      navigation.navigate('Home')
    })
    .catch(err => {
      setError(err)
    })
  }

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
      <Text>Nom d'utilisateur:</Text>
      <TextInput value={username} onChangeText={setUsername} onSubmitEditing={signin} style={styles.input}></TextInput>
      <Text>Mot de passe:</Text>
      <TextInput value={password} onChangeText={setPassword} onSubmitEditing={signin} style={styles.input} secureTextEntry={true}></TextInput>
      <View style={styles.button}>
        <Button onPress={signin} title="Se connecter" />
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

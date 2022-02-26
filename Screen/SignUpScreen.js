import React, { useContext, useState } from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
import signUp from '../components/api/SignUp'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function SignUpScreen({ navigation }) {
  const [ username, setUsername] = useContext(UsernameContext)
  const [, setToken] = useContext(TokenContext)
  const [ password, setPassword] = useState("")
  const [error, setError] = useState("")

  const signup = () => {
    setError("")
    signUp(username, password)
    .then(token => {
      setToken(token)
      setUsername(username)
      navigation.navigate('Home')
    }).catch(err => setError(err.message))
  }

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
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

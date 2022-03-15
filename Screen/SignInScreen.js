import React, { useContext, useState, useRef } from 'react'
import { Text, TextInput, StyleSheet, Button, View, Platform, ToastAndroid, Vibration } from 'react-native'
import signIn from '../components/api/SignIn'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function SignInScreen({ navigation }) {
  const [ username, setUsername] = useContext(UsernameContext)
  const [ token, setToken] = useContext(TokenContext)
  const [ password, setPassword] = useState("")
  const [error, setError] = useState("")
  const passwordInput = useRef()

  const signin = () => {
    if(username !== "" && password !== "") {
      setError("")
      signIn(username, password)
      .then(token => {
        setToken(token)
        setUsername(username)
        navigation.navigate('Home')
      })
      .catch(err => displayError(err))
    } else {
      displayError({message: "Vous devez renseignés tout les champs"})
    }
  }

  const displayError = (err) => {
    if(Platform.OS === 'android') {
      ToastAndroid.showWithGravity(err.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else {
      setError(err.message)
    }
    Vibration.vibrate(300)

  }

  return (
    <View style={styles.container}>
      <Text>{error}</Text>
      <Text>Nom d'utilisateur:</Text>
      <TextInput value={username} autoFocus={true} onChangeText={setUsername} onSubmitEditing={() => passwordInput.current.focus()} returnKeyType='next' style={styles.input}></TextInput>
      <Text>Mot de passe:</Text>
      <TextInput value={password} onChangeText={setPassword} onSubmitEditing={signin} style={styles.input} returnKeyType='default' ref={passwordInput} secureTextEntry={true}></TextInput>
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

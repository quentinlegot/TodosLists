import React, { useContext } from 'react'
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native'
import { UsernameContext } from '../Context/Context'
import cat from '../assets/kitty.gif'

export default function HomeScreen({ navigation }) {
  const [username] = useContext(UsernameContext)
  return (
    <View style={{flex:1, alignItems: 'center'}}>

      <Image source={cat} />

      <Text style={{fontSize: 50}}>Bienvenue !</Text>
      <Text>Vous êtes connecté en tant que <Text style={{color:'#bb565a'}}>{username}</Text></Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('taskListStack')}>
        <Text style={{color: 'blue'}}>Voir votre listes des tâches</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('SignOut')}>
        <Text style={{color: 'blue', marginTop: 25}}>Se déconnecter</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

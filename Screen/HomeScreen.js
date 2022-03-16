import React, { useContext } from 'react'
import { Text, View, TouchableWithoutFeedback} from 'react-native'
import { UsernameContext } from '../Context/Context'

export default function HomeScreen({ navigation }) {
  const [username] = useContext(UsernameContext)
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Bienvenue !</Text>
      <Text>Vous êtes connecté en tant que {username}</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('taskListStack')}>
        <Text style={{color: 'blue'}}>Voir votre listes des tâches</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('SignOut')}>
        <Text style={{color: 'blue', marginTop: 25}}>Se déconnecter</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

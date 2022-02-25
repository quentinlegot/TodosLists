import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { TokenContext } from '../Context/Context'

import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import TodoListsStackScreen from '../Screen/TodoListsStackScreen'

const Tab = createMaterialBottomTabNavigator()

export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen name='Signin' component={SignInScreen} options={{tabBarLabel: "Connexion", headerTitle: "Connexion", }} />
              <Tab.Screen name='Signup' component={SignUpScreen} options={{tabBarLabel: "Inscription", headerTitle: "Inscription"}} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name='Home' component={HomeScreen} options={{tabBarLabel: "Accueil", headerTitle: "Accueil"}} />
              <Tab.Screen name='taskListStack' component={TodoListsStackScreen} options={{headerShown: false, tabBarLabel: "Liste des tâches"}} />
              <Tab.Screen name='SignOut' component={SignOutScreen} options={{tabBarLabel: "Se déconnecter"}} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}

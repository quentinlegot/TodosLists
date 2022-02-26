import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TokenContext } from '../Context/Context'

import homeLogo from '../assets/home-icon.png'
import signinLogo from '../assets/signin-icon.png'
import signupLogo from '../assets/signup-icon.png'
import taskListLogo from '../assets/list-icon.png'
import signoutLogo from '../assets/signout-icon.png'

import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import TodoListsStackScreen from '../Screen/TodoListsStackScreen'
import TabBarIcon from '../components/TabBarIcon'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer >
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen name='Signin' component={SignInScreen} options={{tabBarLabel: "Connexion", headerTitle: "Connexion", tabBarHideOnKeyboard: true, tabBarIcon: ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} source={signinLogo} />}} />
              <Tab.Screen name='Signup' component={SignUpScreen} options={{tabBarLabel: "Inscription", headerTitle: "Inscription", tabBarHideOnKeyboard: true, tabBarIcon:  ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} source={signupLogo} />}} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name='Home' component={HomeScreen} options={{tabBarLabel: "Accueil", headerTitle: "Accueil", tabBarIcon: ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} source={homeLogo} /> }} />
              <Tab.Screen name='taskListStack' component={TodoListsStackScreen} options={{tabBarLabel: "Liste des tâches", headerShown: false, tabBarIcon: ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} source={taskListLogo} />}} />
              <Tab.Screen name='SignOut' component={SignOutScreen} options={{tabBarLabel: "Se déconnecter", tabBarIcon:  ({ focused, color, size }) => <TabBarIcon focused={focused} color={color} size={size} source={signoutLogo} /> }} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}

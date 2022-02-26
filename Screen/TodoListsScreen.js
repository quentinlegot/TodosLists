import React, { useEffect, useState, useContext } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import todoLists from '../components/api/TodoListsQuery'
import TodoListItem from '../components/TodoListItem'
import { UsernameContext, TokenContext } from '../Context/Context'
import refreshLogo from '../assets/refresh-icon.png'
import addLogo from '../assets/add-icon.png'
import FloatingButton from '../components/FloatingButton'

export default function TodoListsScreen({ navigation }) {
  const [list, setList] = useState([])
  const [isLoadingVisible, setIsLoadingVisible] = useState(true)
  const [username] = useContext(UsernameContext)
  const [token] = useContext(TokenContext)
  const [error, setError] = useState("")
  const todoListsRequest = () => {
    setList([])
    setIsLoadingVisible(true)
    setError("")
    todoLists(username, token).then(result => {
      setList(result)
      setIsLoadingVisible(false)
    }).catch(err => {
      setError(err)
      setIsLoadingVisible(false)
    })
  }
  const addItem = () => {
    navigation.push('AddTask')
  }
  useEffect(() => {
    // appelé au premier chargement du composant
    todoListsRequest()
  }, [])
  return (
    <>
      <Text>{error}</Text>
      <Text style={isLoadingVisible ? {textAlign: 'center'} : {display: 'none'}}>chargement en cours</Text>
      <FlatList data={list} renderItem={({item}) => <TodoListItem item={item} />}></FlatList>
      <FloatingButton position={styles.floatingButton1} function={todoListsRequest} image={refreshLogo} />
      <FloatingButton position={styles.floatingButton2} function={addItem} image={addLogo} />
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton1: {
    bottom: 10,
  },
  floatingButton2: {
    bottom: 80,
  }
})
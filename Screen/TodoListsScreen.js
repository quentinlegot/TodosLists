import React, { useEffect, useState, useContext } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import todoLists from '../components/api/QueryTaskLists'
import deleteTasksList from '../components/api/deleteItem'
import TodoListItem from '../components/TodoListItem'
import { UsernameContext, TokenContext } from '../Context/Context'
import refreshLogo from '../assets/refresh-icon.png'
import addLogo from '../assets/add-icon.png'
import FloatingButton from '../components/FloatingButton'

export default function TodoListsScreen({ navigation, route }) {
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
      setError(err.message)
      setIsLoadingVisible(false)
    })
  }
  useEffect(() => {
    // appelé quand après avoir ajouté un élément depuis la page addTask
    if(route.params?.newItem) {
      let newList = list
      newList.push(route.params?.newItem)
      setList(newList)
    }
  }, [route.params?.newItem])

  const addItem = () => {
    navigation.push('AddTask')
  }
  const deleteItem = (id) => {
    setError("")
    deleteTasksList(id, token).then(nodesDeleted => {
      setList(list.filter((v) => v.id !== id))
    }).catch(err => {
      setError(err)
    })
  }
  useEffect(() => {
    // appelé au premier chargement du composant
    todoListsRequest()
  }, [])
  return (
    <>
    <View style={{justifyContent: "center", alignItems: "center"}}>
      <Text style={styles.text_items}>{error}</Text>
      <Text style={styles.text_items}>{isLoadingVisible ? "chargement en cours" : ""}</Text>
      <Text style={styles.text_items}>{list.length === 0 && !isLoadingVisible ? "Aucune tâche, vous pouvez en créer une nouvelle en appuyant sur le bouton +" : ""}</Text>
      <FlatList data={list} renderItem={({item}) => <TodoListItem navigation={navigation} item={item} delete={deleteItem} />} style={{marginTop:20}}></FlatList>
    </View>
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
  },
  text_items: {
    marginTop: 20,
    textAlign: 'center'
  }
})
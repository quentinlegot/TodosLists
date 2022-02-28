import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import QueryTasks from '../components/api/QueryTasks'
import TodoItem from '../components/TodoItem'
import { TokenContext } from '../Context/Context'
import deleteTask from "../components/api/deleteTask"
import FloatingButton from '../components/FloatingButton'
import addLogo from '../assets/add-icon.png'

export default function TodoListScreen({ navigation, route }) {
    const [token] = useContext(TokenContext)
    const [error, setError] = useState("")
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        navigation.setOptions({headerTitle: route.params?.taskList.title})
        request()
    }, [])
    const request = () => {
        setError("")
        QueryTasks(route.params?.taskList.id, token).then(result => {
            setTasks(result)
        }).catch(err => {
            setError(err.message)
        })
    }

    const deleteItem = (id) => {
        deleteTask(id, token).then(() => {
            setTasks(tasks.filter(item => item.id !== id))
        }).catch(err => {
            setError(err.message)
        })
    }
    const addItem = () => {
        navigation.push('AddTodo')
    }
    return (
    <>
        <Text>{error}</Text>
        <FlatList data={tasks} renderItem={({item}) => <TodoItem item={item} setError={setError} deleteItem={deleteItem}></TodoItem>}></FlatList>
        <FloatingButton position={styles.floatingButton1} function={addItem} image={addLogo} />
    </>
  )
}


const styles = StyleSheet.create({
    floatingButton1: {
        bottom: 10,
      },
      floatingButton2: {
        bottom: 80,
      }
})
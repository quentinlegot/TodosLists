import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import QueryTasks from '../components/api/QueryTasks'
import TodoItem from '../components/TodoItem'
import { TokenContext } from '../Context/Context'
import deleteTask from "../components/api/deleteTask"
import FloatingButton from '../components/FloatingButton'
import addLogo from '../assets/add-icon.png'
import refreshLogo from '../assets/refresh-icon.png'

export default function TodoListScreen({ navigation, route }) {
    const [token] = useContext(TokenContext)
    const [error, setError] = useState("")
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        navigation.setOptions({headerTitle: route.params?.taskList.title})
        request()
    }, [])
    useEffect(() => {
        let newTasks = tasks
        newTasks.push(route.params?.newElement)
        setTasks(newTasks)
    }, [route.params?.newElement])
    useEffect(() => {
        request()
    }, [route.params?.editedElement])
    const request = () => {
        setError("")
        setTasks([])
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
        navigation.push('AddTodo', {taskList: route.params?.taskList})
    }
    return (
    <>
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <Text>{error}</Text>
            <FlatList data={tasks} renderItem={({item}) => <TodoItem item={item} setError={setError} deleteItem={deleteItem} navigation={navigation} taskList={route.params?.taskList} />}></FlatList>
        </View>
        <View style={{height: 150, width: Dimensions.get('window').width}} />
        <FloatingButton position={styles.floatingButton2} function={addItem} image={addLogo} />
        <FloatingButton position={styles.floatingButton1} function={request} image={refreshLogo} />
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
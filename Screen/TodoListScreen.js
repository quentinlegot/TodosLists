import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
import QueryTasks from '../components/api/QueryTasks'
import TodoItem from '../components/TodoItem'
import { UsernameContext, TokenContext } from '../Context/Context'

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
    return (
    <>
        <Text>{error}</Text>
        <Text>{route.params?.taskList.title}</Text>
        <FlatList data={tasks} renderItem={({item}) => <TodoItem item={item}></TodoItem>}></FlatList>
    </>
  )
}

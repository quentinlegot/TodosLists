import React, { useContext, useState } from 'react'
import {Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { TokenContext, UsernameContext } from '../Context/Context'
import addTask from '../components/api/addTaskList'

export default function AddTodoListsScreen({ navigation }) {
    const [value, setValue] = useState("")
    const [username] = useContext(UsernameContext)
    const [token] = useContext(TokenContext)
    const [error, setError] = useState("")
    const submit = () => {
        setError("")
        addTask(username, value, token).then(task => {
          navigation.navigate('tasksLists', {newItem: task})
        }).catch(err => {
          setError(err.message)
        })
    }
    return (
        <View style={styles.container}>
            <Text>{error}</Text>
            <Text>Nom de la tâche</Text>
            <TextInput value={value} onChangeText={setValue} onSubmitEditing={submit} style={styles.input}></TextInput>
            <Button onPress={submit} title="Confirmer" style={styles.button}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      button: {
        padding: 10,
        marginHorizontal: 30
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      }
})

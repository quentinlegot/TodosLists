import React, { useContext, useState } from 'react'
import { TextInput, StyleSheet, Button, Text, View } from 'react-native'
import AddTask from '../components/api/addTask'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function AddTodoScreen({navigation, route}) {
    const [token] = useContext(TokenContext)
    const [error, setError] = useState("")
    const [value, setValue] = useState("")
    const submit = () => {
        AddTask(value, route.params?.taskListId, token).then(v => {
            navigation.navigate("TaskList", {newElement: v})
        }).catch(err => {
            setError(err.message)
        })
    }
    return (
    <View style={styles.container}>
        <Text>{error}</Text>
        <Text>Nom de la nouvelle tâche:</Text>
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

import React, { useContext, useState } from 'react'
import { TextInput, StyleSheet, Button, Text, View } from 'react-native'
import { TokenContext } from '../Context/Context'
import updateTask from '../components/api/changeTaskContent'

export default function EditTodoScreen({navigation, route}) {
    const [token] = useContext(TokenContext)
    const [error, setError] = useState("")
    const [value, setValue] = useState(route.params?.item.content)
    const submit = () => {
        setError("")
        updateTask(route.params?.item.id, value, route.params?.item.done, token).then(v => {
            navigation.navigate('TaskList', {editedElement: {id: route.params?.item.id, value, done: route.params?.item.done}, taskList: route.params?.taskList})
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

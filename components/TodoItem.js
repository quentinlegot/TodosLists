import React, { useContext, useState } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';
import deleteIcon from '../assets/delete-icon.png'
import editIcon from '../assets/edit-icon.png'
import { TokenContext } from "../Context/Context";
import updateTask from '../components/api/changeTaskContent'

export default function TodoItem(props) {
    const [token] = useContext(TokenContext)
    const [done, setDone] = useState(props.item.done)
    const [content, setContent] = useState(props.item.content)
    const [contentInput, setContentInput] = useState(props.item.content)
    const changeTaskState = (id, content, done) => {
        return new Promise((resolve, reject) => {
            props.setError("")
            updateTask(id, content, done, token).then(new_v => {
                setContent(new_v.content)
                setContentInput(new_v.content)
                setDone(new_v.done)
                resolve()
            }).catch(err => {
                props.setError(err.message)
                reject(err)
            })
        })
    }
    const changeDoneState = (state) => {
        changeTaskState(props.item.id, content, state) 
    }
    const editTask = () => {
        props.navigation.push('EditTodo', {item: props.item, taskList: props.taskList})
    }
    return (
        <View style={styles.content}>
            <Switch value={done} onValueChange={changeDoneState} />
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{content}</Text>
            <TextInput style={[styles.hide, styles.text_item, styles.text_input]} value={contentInput} onChangeText={setContentInput}></TextInput>
            <TouchableOpacity onPress={editTask}>
                <Image source={editIcon} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.deleteItem(props.item.id)}>
                <Image source={deleteIcon} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row'
    },
    text_item: {
        marginLeft: 10,
        width: 250,
        maxHeight: 24,
        
    },
    hide: {
        display: "none"
    },
    text_input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
})
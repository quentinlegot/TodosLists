import React, { useContext, useState } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';
import deleteIcon from '../assets/delete-icon.png'
import editIcon from '../assets/edit-icon.png'
import closeIcon from '../assets/close-icon.png'
import arrowForward from '../assets/arrow-forward-icon.png'
import { TokenContext } from "../Context/Context";
import updateTask from '../components/api/changeTaskContent'

export default function TodoItem(props) {
    const [token] = useContext(TokenContext)
    const [done, setDone] = useState(props.item.done)
    const [content, setContent] = useState(props.item.content)
    const [contentInput, setContentInput] = useState(props.item.content)
    const [isEditingContent, setIsEditingContent] = useState(false)
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
                reject()
            })
        })
    }
    const changeDoneState = (state) => {
        changeTaskState(props.item.id, content, state) 
    }
    const editContent = () => {
        if(isEditingContent) {
            changeTaskState(props.item.id, contentInput, done).then(() => {
                setIsEditingContent(false)
            })
        } else {
            props.deleteItem(props.item.id)
        }
    }
    return (
        <View style={styles.content}>
            <Switch value={done} onValueChange={changeDoneState} />
            <Text style={[styles.text_item, isEditingContent ? styles.hide : styles.show, { textDecorationLine: done ? 'line-through' : 'none' }]}>{content}</Text>
            <TextInput style={[isEditingContent ? styles.show : styles.hide, styles.text_item, styles.text_input]} value={contentInput} onChangeText={setContentInput}></TextInput>
            <TouchableOpacity onPress={() => {setContentInput(content); setIsEditingContent(!isEditingContent)}}>
                <Image source={isEditingContent ? closeIcon : editIcon} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editContent()}>
                <Image source={isEditingContent ? arrowForward : deleteIcon} style={{ height: 24, width: 24 }} />
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
    show: {

    },
    hide: {
        display: "none"
    },
    text_input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
})
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import deleteIcon from '../assets/delete-icon.png'

export default function TodoListItem(props) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.push('TaskList', {taskList: props.item})}>
            <Text style={styles.text_item}>{props.item.title}</Text>
            <TouchableOpacity onPress={() => props.delete(props.item.id)}>
                <Image source={deleteIcon} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        padding: 15,
        flexDirection: 'row',
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})
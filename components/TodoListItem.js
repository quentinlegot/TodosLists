import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
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
        backgroundColor: '#f3eeff',
        borderRadius: 3,
        shadowColor: "black",
        elevation: 3.5,
        padding: 15,
        flexDirection: 'row',
        width: Dimensions.get("window").width - 80
    },
    text_item: {
        marginLeft: 10,
        width: Dimensions.get("window").width - 140
    }
})
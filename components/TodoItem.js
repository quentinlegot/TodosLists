import React, { useState } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import deleteIcon from '../assets/delete-icon.png'

export default function TodoItem(props) {
    // console.log(props.item)
    const [done, setDone] = useState(props.item.done);
    return (
        <View style={styles.content}>
            <Switch value={done} onValueChange={(state) => {setDone(state);}} />
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
            <TouchableOpacity onPress={() => {}}>
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
        width: 150
    }
})
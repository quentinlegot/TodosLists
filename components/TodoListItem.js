import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, Dimensions, View } from "react-native"
import deleteIcon from '../assets/delete-icon.png'
import * as Progress from 'react-native-progress';
import tasks from './api/QueryTasks';
import { TokenContext } from '../Context/Context';

export default function TodoListItem(props) {

    const [token] = useContext(TokenContext)
    const [progression, setProgression] = useState(0)

    useEffect(() => {
        console.log("new progression")
        tasks(props.item.id,token).then(result => {
            console.log(result.length)
            if(result.length !== 0) {
                let cpt = 0
                for(value of result) {
                    if(value.done === true) {
                        cpt++
                    }
                }
                setProgression(cpt / result.length)
            } else {
                setProgression(0)
            }
        }).catch(err => {
            setError(err.message)
            console.error("error")
        })
    }, [props.isFocus])

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.push('TaskList', {taskList: props.item})}>
            <View style={styles.text_container}>
                <Text style={styles.text_item}>{props.item.title}</Text>
                <TouchableOpacity onPress={() => props.delete(props.item.id)}>
                    <Image source={deleteIcon} style={{ height: 24, width: 24 }} />
                </TouchableOpacity>
            </View>
            <Progress.Bar progress={progression} color={'#76ADE5'} width={Dimensions.get("window").width - 80} height={10} borderRadius={3} />
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
        width: Dimensions.get("window").width - 80
    },
    text_container: {
        padding: 15,
        flexDirection: 'row'
    },
    text_item: {
        marginLeft: 10,
        width: Dimensions.get("window").width - 140
    }
})
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View, Button } from 'react-native'
import QueryTasks from '../components/api/QueryTasks'
import TodoItem from '../components/TodoItem'
import { TokenContext } from '../Context/Context'
import deleteTask from "../components/api/deleteTask"
import FloatingButton from '../components/FloatingButton'
import addLogo from '../assets/add-icon.png'
import refreshLogo from '../assets/refresh-icon.png'
import updateTasks from '../components/api/updateDoneStateFromAllTasks'

export default function TodoListScreen({ navigation, route }) {
    const [token] = useContext(TokenContext)
    const [error, setError] = useState("")
    const [tasks, setTasks] = useState([])
    const [cptDone, setCptDone] = useState(0)
    const [isFiltering, setIsFiltering] = useState(false)
    const [filterDoneState, setFilterDoneState] = useState(false)

    useEffect(() => {
        navigation.setOptions({headerTitle: route.params?.taskList.title})
        request()
    }, [])
    useEffect(() => {
        let newTasks = tasks
        newTasks.push(route.params?.newElement)
        setTasks(newTasks)
    }, [route.params?.newElement])
    useEffect(() => {
        request()
    }, [route.params?.editedElement])
    const request = () => {
        setError("")
        setTasks([])
        setCptDone(0)
        QueryTasks(route.params?.taskList.id, token).then(result => {
            setTasks(result)
            setCptDone(result.filter(item => item.done === true).length)
        }).catch(err => {
            setError(err.message)
            setCptDone(0)
        })
    }

    const deleteItem = (id) => {
        deleteTask(id, token).then(() => {
            setTasks(tasks.filter(item => item.id !== id))
        }).catch(err => {
            setError(err.message)
        })
    }
    const addItem = () => {
        navigation.push('AddTodo', {taskList: route.params?.taskList})
    }

    const updateItem = (id, new_item) => {
        for(const task of tasks) {
            if(task.id === id) {
                task.content = new_item.content
                task.done = new_item.done
                break
            }
        }
    }
    
    const isOneIsNotSelected = () => {
        for(const task of tasks) {
            if(task.done === false)
                return true
        }
        return false
    }

    const isOneIsNotUnselected = () => {
        for(const task of tasks) {
            if(task.done === true) {
                return true
            }
        }
        return false
    }

    const selectAll = (state) => {
        setError("")
        setTasks([])
        setCptDone(0)
        updateTasks(route.params?.taskList.id, state, token).then(result => {
            setTasks(result)
            setCptDone(result.filter(item => item.done === true).length)
        }).catch(err => {
            setError(err.message)
            setCptDone(0)
        })
    }

    const taskFilter = (v) => {
        if(isFiltering) {
            return filterDoneState === v.done
        } else {
            return true
        }
    }

    return (
    <>
        <View>
            {isOneIsNotSelected() ? (<Button onPress={() => {selectAll(true)}} title="Tout Selectionner" />) : (<></>)}
            {isOneIsNotUnselected() ? (<Button onPress={() => {selectAll(false)}} title="Tout Désectionner" />) : (<></>)}
            {!isFiltering || (isFiltering && filterDoneState === false) ? (<Button onPress={() => {setIsFiltering(true); setFilterDoneState(true)}} title="Afficher que les tâches cochées" />) : (<></>)}
            {!isFiltering || (isFiltering && filterDoneState === true) ?  (<Button onPress={() => {setIsFiltering(true);setFilterDoneState(false)}} title="Afficher que les tâches décochées" />) : (<></>)}
            {isFiltering ? (<Button onPress={() => {setIsFiltering(false)}} title="Afficher toutes les tâches" />) : (<></>)}
        </View>
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <Text>{error}</Text>
            <Text>{cptDone} tâches terminés</Text>
            <FlatList data={tasks.filter(taskFilter)} renderItem={({item}) => <TodoItem item={item} cptDone={[cptDone, setCptDone]} setError={setError} deleteItem={deleteItem} navigation={navigation} taskList={route.params?.taskList} updateItem={updateItem} />}></FlatList>
        </View>
        <View style={{height: 150, width: Dimensions.get('window').width}} />
        <FloatingButton position={styles.floatingButton2} function={addItem} image={addLogo} />
        <FloatingButton position={styles.floatingButton1} function={request} image={refreshLogo} />
    </>
  )
}


const styles = StyleSheet.create({
    floatingButton1: {
        bottom: 10,
      },
      floatingButton2: {
        bottom: 80,
      }
})
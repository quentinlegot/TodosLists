import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Button, ActivityIndicator, Dimensions } from 'react-native'
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
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({headerTitle: route.params?.taskList.title})
        request()
    }, [])
    useEffect(() => {
        request()
    }, [route.params?.newElement])
    useEffect(() => {
        request()
    }, [route.params?.editedElement])
    const request = () => {
        setIsLoading(true)
        setError("")
        setTasks([])
        setCptDone(0)
        QueryTasks(route.params?.taskList.id, token).then(result => {
            setTasks(result)
            setCptDone(result.filter(item => item.done === true).length)
            setIsLoading(false)
        }).catch(err => {
            setError(err.message)
            setCptDone(0)
            setIsLoading(false)
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
        setIsLoading(true)
        updateTasks(route.params?.taskList.id, state, token).then(result => {
            setTasks(result)
            setCptDone(result.filter(item => item.done === true).length)
            setIsLoading(false)
        }).catch(err => {
            setError(err.message)
            setCptDone(0)
            setIsLoading(false)
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
        {isLoading ? (<ActivityIndicator size={'large'} style={{paddingTop: 50}} />) : (
            <>
                {isOneIsNotSelected() ? (<Button style={styles.button} onPress={() => {selectAll(true)}} title="Tout Selectionner" />) : (<></>)}
                {isOneIsNotUnselected() ? (<Button style={styles.button}  onPress={() => {selectAll(false)}} title="Tout Désectionner" />) : (<></>)}
                {!isFiltering || (isFiltering && filterDoneState === false) ? (<Button style={styles.button}  onPress={() => {setIsFiltering(true); setFilterDoneState(true)}} title="Afficher que les tâches cochées" />) : (<></>)}
                {!isFiltering || (isFiltering && filterDoneState === true) ?  (<Button style={styles.button}  onPress={() => {setIsFiltering(true);setFilterDoneState(false)}} title="Afficher que les tâches décochées" />) : (<></>)}
                {isFiltering ? (<Button style={styles.button}  onPress={() => {setIsFiltering(false)}} title="Afficher toutes les tâches" />) : (<></>)}
                <Text>{error}</Text>
                <Text>{cptDone} tâches terminés</Text>
                <FlatList data={tasks.filter(taskFilter)} renderItem={({item}) => <TodoItem item={item} cptDone={[cptDone, setCptDone]} setError={setError} deleteItem={deleteItem} navigation={navigation} taskList={route.params?.taskList} updateItem={updateItem} />}></FlatList>
            </>
        )}
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
      },
      button: {
        width: Dimensions.get('screen').width.toFixed()
      }
})
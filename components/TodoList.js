import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import TodoItem from './TodoItem';

export default function TodoList(){
    const [todos, setTodos] = useState([])
    const [count, setCount] = useState(todoData.filter((item)=>item.done).length)
    const [afficherCoche, setAfficherCoche] = useState(0)
    const deleteTodo = (id) => {
        /* const newTodos = todos.filter(item => item.id != id)
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)*/
    }
    const changeTodo = (id) => {
        /* let newTodo = todos
        for(let item of newTodo) {
            if(item.id === id){
                item.done = !item.done
            }
        }
        setTodos(newTodo)
        setCount(todos.filter(item => item.done).length) */
    }

    const addNewTodo = () => {
        /* let newTodos = todos
        newTodos.push({ id: id, content: newTodoText, done: false})
        setId(id + 1)
        setTodos(newTodos)
        setNewTodoText("") */
    }


    return (
        <>
        <Button style={styles.container} title="Afficher que les éléments cochés" onPress={afficherCocher} />
        <Button style={styles.container} title="Afficher que les éléments non cochés" onPress={afficherNonCocher} />
        <Button style={styles.container} title="Afficher tout les éléments" onPress={afficherToutElement} />
        <Text>{count}</Text>
        <TextInput
            onChangeText={setNewTodoText}
            placeholder='saisir ici un nouvel item'
            onSubmitEditing={addNewTodo}
            value={newTodoText}
      />

        <FlatList
            style={{ paddingLeft: 10 }}
            data={todos.filter(item => {
                if(afficherCoche === -1) {
                    if(item.done === false) {
                        return true
                    }
                } else if (afficherCoche === 1) {
                    if(item.done === true) {
                        return true
                    }
                } else {
                    return true
                }
            })}
            renderItem={({item}) => <TodoItem item={item} setCpt={setCount} deleteTodo={deleteTodo} cpt={count} changeTodo={changeTodo} setSwitchList={setSwitchList} switchList={switchList} />} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
  });
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodoListsScreen from './AddTodoListsScreen';
import TodoListsScreen from './TodoListsScreen';
import TodoListScreen from './TodoListScreen';
import AddTodoScreen from './AddTodoScreen';

const Stack = createNativeStackNavigator();

export default function TodoListsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="tasksLists" component={TodoListsScreen} options={{tabBarLabel: "Listes des tâches", headerTitle: "Liste des tâches"}} />
      <Stack.Screen name="AddTask" component={AddTodoListsScreen} options={{headerTitle: "Ajouter une nouvelle liste de tâche"}} />
      <Stack.Screen name="TaskList" component={TodoListScreen} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{headerTitle: "Ajouter une tâche"}}/>
    </Stack.Navigator>
  );
}
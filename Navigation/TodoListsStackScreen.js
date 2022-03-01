import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodoListsScreen from '../Screen/AddTodoListsScreen';
import TodoListsScreen from '../Screen/TodoListsScreen';
import TodoListScreen from '../Screen/TodoListScreen';
import AddTodoScreen from '../Screen/AddTodoScreen';
import EditTodoScreen from '../Screen/EditTodoScreen';

const Stack = createNativeStackNavigator();

export default function TodoListsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="tasksLists" component={TodoListsScreen} options={{tabBarLabel: "Listes des tâches", headerTitle: "Liste des tâches"}} />
      <Stack.Screen name="AddTask" component={AddTodoListsScreen} options={{headerTitle: "Ajouter une nouvelle liste de tâche"}} />
      <Stack.Screen name="TaskList" component={TodoListScreen} options={{tabBarHideOnKeyboard: true}} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{headerTitle: "Ajouter une tâche", tabBarHideOnKeyboard: true}}/>
      <Stack.Screen name="EditTodo" component={EditTodoScreen} options={{headerTitle: "Editer une tâche", tabBarHideOnKeyboard: true}} />
    </Stack.Navigator>
  );
}
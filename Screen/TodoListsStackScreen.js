import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodoListsScreen from './AddTodoListsScreen';
import TodoListsScreen from './TodoListsScreen';

const SettingsStack = createNativeStackNavigator();

export default function TodoListsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="tasksList" component={TodoListsScreen} options={{tabBarLabel: "Liste des tâches", headerTitle: "Liste des tâches"}} />
      <SettingsStack.Screen name="AddTask" component={AddTodoListsScreen} options={{headerTitle: "Ajouter une tâche"}} />
    </SettingsStack.Navigator>
  );
}
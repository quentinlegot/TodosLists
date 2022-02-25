import { StyleSheet, View, Text } from "react-native";


export default function TodoListItem(props) {
    
    return (
        <View style={styles.container}>
            <Text>{props.item.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    }
})
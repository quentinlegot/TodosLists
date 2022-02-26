import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import deleteIcon from '../assets/delete-icon.png'

export default function TodoListItem(props) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text_item}>{props.item.title}</Text>
            <TouchableOpacity onPress={() => {}}>
                <Image source={deleteIcon} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        padding: 15,
        flexDirection: 'row',
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})
import { StyleSheet, TouchableOpacity, Image } from "react-native"

export default function FloatingButton(props) {

    return (
    <>
    <TouchableOpacity style={[styles.floatingButton, props.position]} onPress={props.function}>
        <Image source={props.image} style={styles.floatingButtonImage} />
    </TouchableOpacity>
    </>
    )
}

const styles = StyleSheet.create({
    floatingButton:{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#ee6e73',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      right: 10,
    },
    floatingButtonImage: {
      resizeMode: 'contain',
      width: 30,
      height: 30
    }
})
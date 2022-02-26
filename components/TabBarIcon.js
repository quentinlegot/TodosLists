import { Image } from "react-native"

export default function TabBarIcon({ focused, color, size, source }) {
    return (
        <Image source={source} style={{width: size, height: size, tintColor: color }}/>
    )
}
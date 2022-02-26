import { Image } from "react-native"

export default function TabBarIcon({ focused, color, size, source }) {
    return (
        <Image source={source} style={{width: size * (focused ? 1.2 : 1), height: size * (focused ? 1.2 : 1), tintColor: color }}/>
    )
}
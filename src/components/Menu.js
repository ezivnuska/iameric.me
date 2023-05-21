import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { navigate } from '../navigators/RootNavigation'

const Menu = ({ currentRoute, ...props }) => {
    const handlePress = route => navigate(route)

    return (
        <View style={styles.container}>
            {currentRoute !== 'users' && (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handlePress('users')}
                >
                    <Text>Users</Text>
                </TouchableOpacity>
            )}
            {currentRoute !== 'home' && (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handlePress('home')}
                >
                    <Text>Home</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ccc',
    },
    item: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})
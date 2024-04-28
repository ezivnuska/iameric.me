import React from'react'
import {
    Button,
    View,
} from 'react-native'

const NavButton = ({ title, onPress }) => (
    <Button
        title={title}
        onPress={onPress}
        style={{ flex: 1, flexGrow: 1 }}
    />
)

export default ({ navigation }) => {
    return (
        <View
            style={{
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly,'
            }}
        >
            <NavButton title='Profile' onPress={() => navigation.navigate('User')} />
            <NavButton title='Images' onPress={() => navigation.navigate('Forum')} />
            <NavButton title='Vendors' onPress={() => navigation.navigate('Vendors')} />
        </View>
    )
}
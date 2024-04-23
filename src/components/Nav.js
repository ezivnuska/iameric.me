import React from'react'
import {
    Button,
    View,
} from 'react-native'
import { navigationRef } from '@navigation/RootNavigation'

export default () => (
    <View>
        <Button title='Profile' onPress={() => navigationRef.navigate('Profile')} />
        <Button title='Forum' onPress={() => navigationRef.navigate('Forum')} />
    </View>
)
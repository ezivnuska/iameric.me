import React from 'react'
import {
    View,
} from 'react-native'
import {
    Notification,
} from './components'
import {
    useNotification,
} from '.'

export default () => {

    const {
        notifications,
        removeNotification,
    } = useNotification()
    
    return (
        <View
            style={{
                marginHorizontal: 10,
                marginVertical: 10,
                gap: 5,
                display: notifications.length,
            }}
        >
            {notifications.map((note, index) => (
                <View key={`note-${index}`}>
                    <Notification text={note} onPress={() => removeNotification(index)} />
                </View>
            ))}
        </View>
    )
}
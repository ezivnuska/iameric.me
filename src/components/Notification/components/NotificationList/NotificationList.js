import React from 'react'
import { View } from 'react-native'
import { NotificationListItem } from './components'
import { useNotification } from '../../NotificationContext'

export default () => {

    const {
        notifications,
        removeNotification,
    } = useNotification()
    
    return (
        <View
            style={{
                display: notifications.length ? 'flex' : 'none',
                marginHorizontal: 10,
                marginVertical: 10,
                gap: 5,
            }}
        >
            {notifications.map((note, index) => (
                <View
                    key={`note-${index}`}
                    style={{ justifyContent: 'flex-end' }}
                >
                    <NotificationListItem
                        text={note}
                        onPress={() => removeNotification(index)}
                    />
                </View>
            ))}
        </View>
    )
}
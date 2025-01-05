import React from 'react'
import { View } from 'react-native'
import { NotificationListItem } from './components'
import { useNotification } from '@context'

export default () => {

    const {
        notifications,
        removeNotification,
    } = useNotification()
    
    return (
        <View
            style={{
                display: notifications.length ? 'block' : 'none',
                marginHorizontal: 10,
                marginBottom: 5,
            }}
        >
            {notifications.map((note, index) => (
                <NotificationListItem
                    key={`note-${index}`}
                    text={note}
                    remove={() => removeNotification(index)}
                />
            ))}
        </View>
    )
}
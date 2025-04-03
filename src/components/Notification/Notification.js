import React from 'react'
import { FlatList, View } from 'react-native'
import { NotificationListItem } from './components'
import { Row, Stack } from '@components'
import { Size } from '@utils/stack'
import { useNotification } from '@context'

const Notification = () => {

    const { notifications, removeNotification } = useNotification()
    
    return (
        <View
            style={{
                display: notifications.length ? 'block' : 'none',
                marginHorizontal: Size.S,
                marginBottom: Size.S,
            }}
        >
            <FlatList
                data={notifications}
                extraData={notifications}
                keyExtractor={(item, index) => `note-${index}`}
                renderItem={({ item, index }) => (
                    <NotificationListItem
                        text={item}
                        remove={() => removeNotification(index)}
                    />
                )}
            />
            
        </View>
    )
}

export default Notification
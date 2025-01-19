import React from 'react'
import { FlatList, View } from 'react-native'
import { NotificationListItem } from './components'
import { useNotification } from '@context'

const Notification = () => {

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
            <FlatList
                data={notifications}
                extraData={notifications}
                keyExtractor={item => `note-${item._id}`}
                // getItemLayout={(data, index) => (
                //     {
                //         length: ITEM_HEIGHT,
                //         offset: ITEM_HEIGHT * index, index
                //     }
                // )}
                // horizontal={landscape}
                // numColumns={landscape ? 2 : 1}
                // onRefresh={onRefresh}
                // refreshing={refreshing}
                // initialNumToRender={6}
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
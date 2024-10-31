import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { PostForm } from '@forms'
import { useModal } from '@modal'

const FeedHeader = () => {

    const { setModal } = useModal()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                // justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
            }}
        >
            <ThemedText bold size={20}>
                Feed
            </ThemedText>

            <IconButton
                name='add-circle-outline'
                onPress={() => setModal('POST')}
                size={22}
            />

        </View>
    )
}

export default FeedHeader
import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { useModal } from '@modal'

export default () => {

    const { setModal } = useModal()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                // justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <ThemedText bold size={20}>
                Forum
            </ThemedText>

            <IconButton
                name='add-circle-outline'
                onPress={() => setModal('FEEDBACK')}
                size={22}
            />

        </View>
    )
}
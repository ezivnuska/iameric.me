import React from 'react'
import { View } from 'react-native'
import {
    IconButtonLarge,
    ThemedText,
} from '@components'

const ScreenHeader = ({ label, setModal = null }) => (
    <View
        style={{
            flexGrow: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
        }}
    >
        <ThemedText bold size={32}>
            {label}
        </ThemedText>

        {setModal !== null && (
            <IconButtonLarge
                name='create-outline'
                onPress={setModal}
                size={36}
                transparent
            />
        )}

    </View>
)

export default ScreenHeader
import React from 'react'
import { View } from 'react-native'
import { IconButtonLarge, TextCopy } from '@components'

const ScreenHeader = ({ label, setModal = null }) => (
    <View
        style={{
            flexGrow: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 15,
            paddingHorizontal: 10,
        }}
    >
        <TextCopy bold size={32}>
            {label}
        </TextCopy>

        {setModal !== null && (
            <IconButtonLarge
                name='create-outline'
                onPress={setModal}
                size={32}
                transparent
            />
        )}

    </View>
)

export default ScreenHeader
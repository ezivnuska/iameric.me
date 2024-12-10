import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, SimpleButton } from '@components'

const ImagePickerView = ({ active, cancel, select, disabled = false }) => (
    <View
        style={{
            flex: 1,
            flexGrow: 1,
            gap: 30,
            paddingHorizontal: 10,
        }}
    >
        {active && <ActivityIndicator size='medium' />}

        <View
            style={{
                flex: 1,
                gap: 10,
            }}
        >
        
            <SimpleButton
                label='Select Image'
                onPress={select}
                disabled={disabled}
            />

            <SimpleButton
                label='Cancel'
                onPress={cancel}
                disabled={disabled}
                color='#fff'
                transparent
            />

        </View>
    </View>
)

export default ImagePickerView
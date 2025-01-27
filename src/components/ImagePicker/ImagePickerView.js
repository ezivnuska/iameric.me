import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'

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
        
            <Button
                mode='contained'
                onPress={select}
                disabled={disabled}
            >
                Select Image
            </Button>

            <Button
                mode='contained'
                onPress={cancel}
                disabled={disabled}
            >
                Cancel
            </Button>

        </View>
    </View>
)

export default ImagePickerView
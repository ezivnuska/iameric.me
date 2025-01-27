import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

const ModalHeader = ({ children, title, color = '#000', onClose = null, ...props }) => (
    <View
        style={[
            {
                flexGrow: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
            },
            props.style,
        ]}
    >
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <Text variant='titleLarge'>
                {title}
            </Text>

            {children}

        </View>

        <IconButton
            icon='close'
            onPress={onClose}
            disabled={!onClose}
            size={25}
        />
    </View>
)

export default ModalHeader
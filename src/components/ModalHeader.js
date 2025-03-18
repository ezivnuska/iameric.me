import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from'react-native-paper'
import { useModal } from '@context'

const ModalHeader = ({ title = null }) => {
    
    const { closeModal } = useModal()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                }}
            >
                {title && (
                    <Text
                        variant='headlineSmall'
                        style={{ flex: 1 }}
                    >
                        {title}
                    </Text>
                )}

            </View>

            <IconButton
                icon='close-thick'
                onPress={closeModal}
                style={{ margin: 0, padding: 0 }}
            />
        </View>
    )
}

export default ModalHeader
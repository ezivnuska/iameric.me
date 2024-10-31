import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useModal } from '@modal'
import Icon from 'react-native-vector-icons/Ionicons'

const ModalHeader = ({ children, title, closeable = true, ...props }) => {

    const { theme } = useApp()
    const { closeModal } = useModal()

    const handleClose = () => {
        closeModal()
    }

    return (
        <View
            style={[
                {
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 5,
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
                <ThemedText bold size={20}>
                    {title}
                </ThemedText>

                {children && children}

            </View>

            <Pressable 
                onPress={handleClose}
                diabled={!closeable}
            >
                <Icon
                    name={'close'}
                    size={24}
                    color={closeable ? theme?.colors.textDefault : 'rgba(200, 200, 200, 0.5)'}
                />
            </Pressable>
        </View>
    )
}

export default ModalHeader
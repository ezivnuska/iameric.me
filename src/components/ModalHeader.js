import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const ModalHeader = ({ children, title, color = null, onClose = null, ...props }) => {

    const { theme } = useApp()

    return (
        <View
            style={[
                {
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 15,
                    paddingLeft: 10,
                    paddingRight: 5,
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
                <ThemedText
                    bold
                    size={36}
                    color={color || theme?.colors.textDefault}
                >
                    {title}
                </ThemedText>

                {children}

            </View>

            <Pressable 
                onPress={onClose}
                disabled={!onClose}
            >
                <Icon
                    name={'close'}
                    size={40}
                    color={color || theme?.colors.textDefault}
                />
            </Pressable>
        </View>
    )
}

export default ModalHeader
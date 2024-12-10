import React from 'react'
import { Pressable, View } from 'react-native'
import { DefaultText } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'

const ModalHeader = ({ children, title, color = '#000', onClose = null, ...props }) => (
    <View
        style={[
            {
                flexGrow: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingVertical: 15,
                // paddingLeft: 10,
                // paddingRight: 5,
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
            <DefaultText
                bold
                size={26}
                color={color}
            >
                {title}
            </DefaultText>

            {children}

        </View>

        <Pressable 
            onPress={onClose}
            disabled={!onClose}
        >
            <Icon
                name='close'
                size={32}
                color={color}
            />
        </Pressable>
    </View>
)

export default ModalHeader
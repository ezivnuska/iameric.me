
import React from 'react'
import { Pressable, View } from 'react-native'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButtonLarge = ({ disabled, name, onPress, color = null, size = 18, transparent = false, ...props }) => {

    const { theme } = useApp()

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={[
                {
                    flexGrow: 0,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    width: 40,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: transparent
                        ? 'transparent'
                        : disabled
                            ? '#000'
                            : color
                                ? color
                                : 'tomato',
                                // :'rgba(255, 99, 71, 0.3)'
                },
                props.style,
            ]}
        >
            <Icon
                name={name}
                size={size}
                color={(color && transparent) ? color : '#fff'}
                style={{
                    paddingLeft: 1,
                    marginHorizontal: 'auto',
                }}
            />
        </Pressable>
    )
}

export default IconButtonLarge
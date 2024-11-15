
import React from 'react'
import { Pressable, View } from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButtonLarge = ({ disabled, name, onPress, color = null, size = 18, transparent = false, label = null, ...props }) => {

    const { theme } = useApp()

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={[
                {
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    overflow: 'hidden',
                    paddingVertical: 5,
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
            <View
                style={{
                    marginHorizontal: 'auto',
                    // gap: 5,
                }}
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

                {label && (
                    <ThemedText size={12} color='#fff' bold>
                        {label}
                    </ThemedText>
                )}
            </View>
        </Pressable>
    )
}

export default IconButtonLarge
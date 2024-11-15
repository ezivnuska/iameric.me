import React, { useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Cabinet = ({
    children,
    closed = true,
    title = null,
    color = null,
    transparent = false,
}) => {
    
    const [open, setOpen] = useState(!closed)

    return (
        <View
            style={{
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: transparent
                    ? 'transparent'
                    : color
                        ? color
                        : 'tomato',
            }}
        >

            <Pressable
                onPress={() => setOpen(!open)}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: transparent ? 0 : 20,
                    paddingRight: transparent ? 0 : 10,
                    height: 50,
                    backgroundColor: transparent
                        ? 'transparent'
                        : open
                            ? 'rgba(255, 99, 71, 0.3)'
                            : '#fff',
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        lineHeight: 50,
                        letterSpacing: 0.5,
                        fontWeight: 700,
                        color: (color && transparent)
                            ? color
                            : open
                                ? '#000'
                                : 'tomato',
                    }}
                >
                    {title}
                </Text>

                <Icon
                    name={open ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={
                        (color && transparent)
                            ? color
                            : open
                                ? '#000'
                                : 'tomato'
                    }
                />

            </Pressable>
            
            {open && children}

        </View>
    )
}

export default Cabinet
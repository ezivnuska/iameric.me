import React, { useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const Cabinet = ({ children, closed = true, title = null, color = null, transparent = false }) => {

    const { theme } = useApp()
    
    const [open, setOpen] = useState(!closed)

    return (
        <View
            style={{
                backgroundColor: transparent
                    ? 'transparent'
                    : color
                        ? color
                        : 'tomato',
                borderRadius: 10,
                overflow: 'hidden',
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
                    backgroundColor: transparent
                        ? 'transparent'
                        : open
                            ? 'rgba(255, 99, 71, 0.3)'
                            : color,
                    height: 40,
                }}
            >
                <Text
                    style={{
                        color: (color && transparent)
                            ? color
                            : open
                                ? '#000'
                                : 'tomato',
                        fontSize: 18,
                        lineHeight: 40,
                        letterSpacing: 0.5,
                        fontWeight: 700,
                    }}
                >
                    {title}
                </Text>

                <Icon
                    name={open ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={'pink' || theme?.colors.textDefault}
                    // color={'#fff' || theme?.colors.textDefault}
                />

            </Pressable>
            
            {open && <View style={{ padding: 10 }}>{children}</View>}

        </View>
    )
}

export default Cabinet
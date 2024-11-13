import React, { useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ children, closed = true, title = null, color = 'tomato' }) => {

    const { theme } = useApp()
    
    const [open, setOpen] = useState(!closed)

    return (
        <View
            style={{
                background: '#eee',
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
                    paddingLeft: 20,
                    paddingRight: 10,
                    background: open ? 'rgba(255, 99, 71, 0.3)' : color,
                    height: 40,
                }}
            >
                <Text
                    style={{
                        color: open ? color : '#fff',
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
                    color={'#fff' || theme?.colors.textDefault}
                />

            </Pressable>
            
            {open && <View style={{ padding: 10 }}>{children}</View>}

        </View>
    )
}
import React, { useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ children, closed = true, title = null }) => {

    const { theme } = useApp()
    
    const [open, setOpen] = useState(!closed)

    return (
        <View
            style={{
                background: '#eee',
                marginVertical: 3,
                borderRadius: 10,
                overflow: 'hidden',
                // borderBottomLeftRadius: 10,
                // borderBottomRightRadius: 10,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    background: '#ccc',
                }}
            >

                {title && <ThemedText bold size={18}>{title}</ThemedText>}

                <Pressable onPress={() => setOpen(!open)}>    
                    <Icon
                        name={open ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>

            </View>
            
            {open && <View style={{ padding: 10 }}>{children}</View>}

        </View>
    )
}
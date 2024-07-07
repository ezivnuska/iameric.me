import React, { useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ children, title = null }) => {

    const { theme } = useApp()
    
    const [open, setOpen] = useState(false)

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    background: '#ccc',
                }}
            >
                {title && (
                    <ThemedText
                        size={18}
                        bold={open}
                    >
                        {title}
                    </ThemedText>
                )}

                <Pressable
                    onPress={() => setOpen(!open)}
                >
                    
                    <Icon
                        name={open ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>
            </View>
            
            {open && (
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}
                >
                    {children}
                </View>
            )}
        </View>
    )
}
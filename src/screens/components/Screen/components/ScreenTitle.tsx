import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { Pressable } from 'react-native'
import { useApp } from '@app'

export default ({ title, ...props }) => {
    
    const { theme } = useApp()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 10,
                gap: 10,
            }}
        >
            <View style={{ flexGrow: 0 }}>
                <Pressable
                    onPress={() => props.navigation.navigate('User')}
                >
                    <ThemedText
                        bold
                        size={20}
                        color={props.route.name !== 'User' ? theme?.colors.textDefault : '#aaa'}
                    >
                        {title}
                    </ThemedText>
                </Pressable>
            </View>

        </View>
    )
}
import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'

import Icon from 'react-native-vector-icons/Ionicons'

export default ({ title, onBack = null }) => {
    
    const { theme } = useApp()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
            }}
        >
            {onBack && (
                <Pressable
                    onPress={onBack}
                >
                    <Icon
                        name='chevron-back-sharp'
                        size={18}
                        color={theme?.colors.textDefault || 'tomato'}
                    />
                </Pressable>
            )}

            <ThemedText
                bold
                size={20}
                color='tomato'
            >
                {title}
            </ThemedText>
        </View>
    )
}
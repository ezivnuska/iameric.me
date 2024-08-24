import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ title, children = null, onBack = null }) => {
    
    const { theme } = useApp()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                // marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 5,
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

            <View style={{ flexGrow: 1 }}>
                {children}
            </View>
        </View>
    )
}
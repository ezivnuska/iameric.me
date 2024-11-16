import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const Heading = ({ title, children = null, color = null, onBack = null, ...props }) => {
    
    const { theme } = useApp()

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                },
                props.style,
            ]}
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
                            size={36}
                            color={theme?.colors.textDefault || 'tomato'}
                        />
                    </Pressable>
                )}

                <ThemedText
                    bold
                    size={36}
                    color={color || theme?.colors.textDefault}
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

export default Heading
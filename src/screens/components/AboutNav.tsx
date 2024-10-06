import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'

export default ({ onPress, type = 'work' }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        }}
    >
        <View
            style={{
                flex: 1,
                paddingHorizontal: 2,
                borderRightWidth: 1,
                borderRightColor: '#eee',
            }}
        >
            <Pressable
                onPress={onPress}
                disabled={type === 'work'}
                style={{
                    borderRadius: 4,
                    background: type === 'work' ? '#eee' : 'transparent',
                }}
            >
                <ThemedText
                    bold={type === 'work'}
                    style={{ textAlign: 'center' }}
                >
                    Work
                </ThemedText>
            </Pressable>
        </View>

        <View
            style={{
                flex: 1,
                paddingHorizontal: 2,
            }}
        >
            <Pressable
                onPress={onPress}
                disabled={type === 'play'}
                style={{
                    borderRadius: 4,
                    background: type === 'play' ? '#eee' : 'transparent',
                }}
            >
                <ThemedText
                    bold={type === 'play'}
                    style={{ textAlign: 'center' }}
                >
                    Play
                </ThemedText>

            </Pressable>
        </View>
        
    </View>
)
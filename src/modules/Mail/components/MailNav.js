import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'

export default ({ onChange, type }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderRadius: 6,
                background: '#ccc',
            }}
        >

            <Pressable
                onPress={() => onChange('in')}
                disabled={type === 'in'}
                style={{
                    flex: 1,
                    background: type === 'in' ? 'tomato' : 'transparent',
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                }}
            >
                <ThemedText
                    bold={type === 'out'}
                    style={{
                        textAlign: 'center',
                        lineHeight: 30,
                    }}
                >
                    In
                </ThemedText>
            </Pressable>

            <Pressable
                onPress={() => onChange('all')}
                disabled={type === 'all'}
                style={{
                    flex: 1,
                    background: type === 'all' ? 'tomato' : 'transparent',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderLeftColor: '#aaa',
                    borderRightColor: '#aaa',
                }}
            >
                <ThemedText
                    bold={type === 'all'}
                    style={{
                        textAlign: 'center',
                        lineHeight: 30,
                    }}
                >
                    All
                </ThemedText>

            </Pressable>

            <Pressable
                onPress={() => onChange('out')}
                disabled={type === 'out'}
                style={{
                    flex: 1,
                    background: type === 'out' ? 'tomato' : 'transparent',
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                }}
            >
                
                <ThemedText
                    bold={type === 'out'}
                    style={{
                        textAlign: 'center',
                        lineHeight: 30,
                    }}
                >
                    Out
                </ThemedText>

            </Pressable>
        </View>
    )
}
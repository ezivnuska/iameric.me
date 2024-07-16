import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'

export default ({ onChange, type }) => (
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
            }}
        >
            <Pressable
                onPress={() => onChange('in')}
                disabled={type === 'in'}
                style={{
                    borderRadius: 4,
                    background: type === 'in' ? '#eee' : 'transparent',
                }}
            >
                <ThemedText
                    bold={type === 'in'}
                    style={{ textAlign: 'center' }}
                >
                    In
                </ThemedText>
            </Pressable>
        </View>

        <View
            style={{
                flex: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: '#eee',
                borderRightColor: '#eee',
                paddingHorizontal: 2,
            }}
        >
            <Pressable
                onPress={() => onChange('all')}
                disabled={type === 'all'}
                style={{
                    borderRadius: 4,
                    background: type === 'all' ? '#eee' : 'transparent',
                }}
            >
                <ThemedText
                    bold={type === 'all'}
                    style={{ textAlign: 'center' }}
                >
                    All
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
                onPress={() => onChange('out')}
                disabled={type === 'out'}
                style={{
                    borderRadius: 4,
                    background: type === 'out' ? '#eee' : 'transparent',
                }}
            >

                <ThemedText
                    bold={type === 'out'}
                    style={{ textAlign: 'center' }}
                >
                    Out
                </ThemedText>

            </Pressable>
        </View>
    </View>
)
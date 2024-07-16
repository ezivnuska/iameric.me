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

        <Pressable
            onPress={() => onChange('in')}
            disabled={type === 'in'}
            style={{ flex: 1 }}
        >
            <ThemedText
                bold={type === 'in'}
                style={{ textAlign: 'center' }}
            >
                In
            </ThemedText>
        </Pressable>

        <Pressable
            onPress={() => onChange('all')}
            disabled={type === 'all'}
            style={{
                flex: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: '#aaa',
                borderRightColor: '#aaa',
            }}
        >
            <ThemedText
                bold={type === 'all'}
                style={{ textAlign: 'center' }}
            >
                All
            </ThemedText>

        </Pressable>

        <Pressable
            onPress={() => onChange('out')}
            disabled={type === 'out'}
            style={{ flex: 1 }}
        >

            <ThemedText
                bold={type === 'out'}
                style={{ textAlign: 'center' }}
            >
                Out
            </ThemedText>

        </Pressable>
    </View>
)
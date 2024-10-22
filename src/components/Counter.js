import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'

const Counter = ({ label, value, min, max, onChange }) => (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }}
    >
        <IconButton
            name='remove-circle-sharp'
            size={30}
            onPress={() => onChange(value - 1)}
            disabled={value === min}
            color='#FF69B4'
        />
        <ThemedText
            size={24}
            color='#662d91'
            bold
        >
            {`${label ? `${label} ` : null}${value}`}
        </ThemedText>
        <IconButton
            name='add-circle-sharp'
            size={30}
            onPress={() => onChange(value + 1)}
            disabled={value === max}
            color='#FF69B4'
        />
    </View>
)

export default Counter
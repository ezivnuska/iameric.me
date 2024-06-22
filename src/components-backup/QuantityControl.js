import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
} from '.'
import { useApp } from '@context'

export default ({ value, onChange }) => {

    const { theme } = useApp()
    
    const increase = () => {onChange(value + 1)}
    const decrease = () => onChange(value - 1)

    return (
        <View
            style={{
                // flex: 1,
                width: '100%',
                height: 35,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: theme?.colors.textDefault,
                borderRadius: 10,
                marginHorizontal: 'auto',
            }}
        >
            <IconButton
                iconName='remove-outline'
                onPress={decrease}
                disabled={value < 2}
                style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: theme?.colors.textDefault,
                    borderRadius: 'none',
                }}
                textStyles={{
                    lineHeight: 35,
                    fontSize: 24,
                }}
                transparent
            />
    
            <ThemedText
                style={{
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 700,
                    lineHeight: 35,
                }}
            >
                {value}
            </ThemedText>
    
            <IconButton
                iconName='add-outline'
                onPress={increase}
                style={{
                    flex: 1,
                    borderLeftWidth: 1,
                    borderColor: theme?.colors.textDefault,
                    borderRadius: 'none',
                }}
                textStyles={{
                    lineHeight: 35,
                    fontSize: 24,
                }}
                transparent
            />
    
        </View>
    )
}
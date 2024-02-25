import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import classes from '@styles/classes'
import { useTheme } from 'react-native-paper'

export default ({ children, title = null }) => {
    
    const theme = useTheme()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <ThemedText
                style={[
                    classes.pageTitle,
                    {
                        marginHorizontal: 10,
                        color: theme?.colors.headerPrimary,
                    },
                ]}
            >
                {title}
            </ThemedText>
            <View>
                {children}
            </View>
        </View>
    )
}
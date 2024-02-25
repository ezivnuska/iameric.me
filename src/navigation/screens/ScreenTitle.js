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
                alignItems: 'baseline',
            }}
        >
            <ThemedText
                style={[
                    classes.pageTitle,
                    {
                        flexBasis: 'auto',
                        flexGrow: 1,
                        marginHorizontal: 10,
                        color: theme?.colors.headerPrimary,
                        lineHeight: 30,
                    },
                ]}
            >
                {title}
            </ThemedText>

            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                {children}
            </View>

        </View>
    )
}
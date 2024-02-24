import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import classes from '@styles/classes'

export default ({ children, title = null }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}
    >
        <ThemedText style={classes.pageTitle}>
            {title}
        </ThemedText>
        <View>
            {children}
        </View>
    </View>
)
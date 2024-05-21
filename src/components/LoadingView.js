import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '.'
import { classes } from '@styles'

export default ({ loading = null }) => {
    
    return (
        <View
            style={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <ThemedText
                align='center'
                style={classes.loadStatus}
            >
                {loading || 'Loading...'}
            </ThemedText>

        </View>
    )
}
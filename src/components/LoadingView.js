import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '.'
import { AppContext } from '@context'
import classes from '@styles/classes'

export default () => {
    
    const { loading } = useContext(AppContext)
    
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
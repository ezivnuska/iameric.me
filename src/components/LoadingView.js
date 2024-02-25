import React, { useContext } from 'react'
import {
    Text,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import ThemedText from './ThemedText'
import classes from '@styles/classes'

export default ({ label = null }) => {

    const {
        loading,
    } = useContext(AppContext)

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >

            <ThemedText style={classes.headerPrimary}>
                {label || loading || 'Loading...'}
            </ThemedText>

        </View>
    )
}
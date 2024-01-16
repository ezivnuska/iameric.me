import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import classes from '../styles/classes'

export default ({ location }) => {
    
    if (!location) return null
    
    const { address1, address2, city, state, zip } = location
    
    return (
        <View style={{ borderWidth: 1, borderColor: 'pink'}}>
            <Text style={classes.textDefault}>{address1}{address2.length ? `, ${address2}` : null}</Text>
            <Text style={classes.textDefault}>{`${city}, ${state} ${zip}`}</Text>
        </View>
    )
}
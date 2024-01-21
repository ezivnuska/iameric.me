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
        <View>
            <Text style={classes.textSmaller}>{address1}{address2.length ? `, ${address2}` : null}</Text>
            <Text style={classes.textSmaller}>{`${city}, ${state} ${zip}`}</Text>
        </View>
    )
}
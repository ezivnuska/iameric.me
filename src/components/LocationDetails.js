import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import defaultStyles from '../styles/main'

const LocationDetails = ({ location }) => {
    
    if (!location) return null
    
    const { address1, address2, city, state, zip } = location
    
    return (
        <View>
            <Text style={defaultStyles.text}>{address1}{address2.length ? ` ${address2}` : null}</Text>
            <Text style={defaultStyles.text}>{`${city}, ${state} ${zip}`}</Text>
        </View>
    )
}

export default LocationDetails
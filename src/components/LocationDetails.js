import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import defaultStyles from '../styles'

const LocationDetails = ({ location }) => (
    <View style={styles.container}>
        <Text style={defaultStyles.text}>{location.address1}{location.address2.length ? ` ${location.address2}` : null}</Text>
        <Text style={defaultStyles.text}>{`${location.city}, ${location.state} ${location.zip}`}</Text>
    </View>
)

export default LocationDetails

const styles = StyleSheet.create({
    container: {
        
    },
})
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const LocationDetails = ({ location }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{location.address1}{location.address2.length ? ` ${location.address2}` : null}</Text>
        <Text style={styles.text}>{`${location.city}, ${location.state} ${location.zip}`}</Text>
    </View>
)

export default LocationDetails

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    text: {
        marginRight: 7,
    },
})
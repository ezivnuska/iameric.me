import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const LocationDetails = ({ location }) => (
    <View style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.text}>{location.address1}{location.address2.length ? ` ${location.address2}` : null}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>{location.city},</Text>
            <Text style={styles.text}>{location.state}</Text>
            <Text style={styles.text}>{location.zip}</Text>
        </View>
    </View>
)

export default LocationDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    text: {
        marginRight: 7,
    },
})
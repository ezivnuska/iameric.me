import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const CountdownTimer = ({ time }) => (
    <View style={styles.container}>
        
    </View>
)

export default CountdownTimer

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    text: {
        lineHeight: 24,
    },
    highlighted: {
        fontWeight: 600,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    },
})
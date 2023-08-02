import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const DriverHome = () => (
    <View style={styles.container}>
        <Text>Driver page.</Text>
    </View>
)

export default DriverHome

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 350,
        width: 350,
    },
})
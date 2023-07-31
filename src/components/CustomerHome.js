import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    VendorDisplay,
} from '.'
import defaultStyles from '../styles'

const CustomerHome = () => (
    <View style={styles.container}>
        <VendorDisplay />
    </View>
)

export default CustomerHome

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 450,
        width: 375,
    },
})
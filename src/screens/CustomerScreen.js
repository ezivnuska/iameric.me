import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    VendorDisplay,
} from '../components'
import defaultStyles from '../styles'

const CustomerScreen = ({ navigation }) => (
    <View style={styles.container}>
        <VendorDisplay />
    </View>
)

export default CustomerScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 450,
        width: 375,
    },
})
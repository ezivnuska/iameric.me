import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    PanelView,
    VendorDisplay,
} from '.'
import defaultStyles from '../styles/main'

const CustomerHome = () => (
    <PanelView type='full'>
        <VendorDisplay />
    </PanelView>
)

export default CustomerHome

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        minWidth: 350,
        maxWidth: 450,
        width: '100%',
        marginVertical: 15,
    },
})
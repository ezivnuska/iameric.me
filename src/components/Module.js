import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const Module = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
)

export default Module

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        marginHorizontal: 5,
        width: '20%',
        minWidth: 200,
        maxWidth: 300,
        marginBottom: 10,
    },
})
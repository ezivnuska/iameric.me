import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import defaultStyles from '../styles'

const Module = ({ children, title = null }) => (
    <View style={styles.container}>
        {title && <Text style={defaultStyles.heading}>{title}</Text>}
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
        paddingHorizontal: 5,
        paddingBottom: 5,
        marginVertical: 5,
        maxWidth: 350,
        minWidth: 400,
        width: 'auto',
    },
})
import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const Container = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
)

export default Container

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: 300,
        minWidth: 350,
        maxWidth: 350,
    },
})
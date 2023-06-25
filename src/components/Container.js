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
        paddingBottom: 20,
        width: '100%',
        // minWidth: 300,
        // maxWidth: 900,
        borderWidth: 4,
        borderStyle: 'dotted',
        borderColor: '#ccc',
    },
})
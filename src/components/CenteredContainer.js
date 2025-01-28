import React from 'react'
import { StyleSheet, View } from 'react-native'

const CenteredContainer = ({ children = null }) => children && (
    <View style={styles.container}>
        {children}
    </View>
)

export default CenteredContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        minWidth: 300,
        marginHorizontal: 'auto',
        // backgroundColor: 'pink',
    },
})
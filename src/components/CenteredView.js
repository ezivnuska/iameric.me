import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const CenteredView = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
)

export default CenteredView

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
    },
})


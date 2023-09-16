import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const CenteredView = ({ children, ...props }) => (
    <View style={[styles.container, props.style]}>
        {children}
    </View>
)

export default CenteredView

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderWidth: 1,
        borderStyle: 'dashed',
    },   
})
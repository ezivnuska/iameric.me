import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

const ScreenContent = ({ children, ...props }) => (
    <View style={styles.screenContent}>
        {children}
    </View>
)

export default ScreenContent

const styles = StyleSheet.create({
    screenContent: {
        marginHorizontal: 'auto',
        width: 375,
        minWidth: 300,
        maxWidth: '100%',
        // borderWidth: 1,
        // borderStyle: 'dashed',
        // borderColor: 'orange',
    },
})
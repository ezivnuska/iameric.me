import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'

const CenteredView = ({ activity, children, label = null }) => (
    <View style={[styles.container]}>
        {activity && <ActivityIndicator size='small' />}
        {label && <Text style={styles.label}>{label}</Text>}
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
        // backgroundColor: 'red',
        // borderWidth: 4,
        // borderStyle: 'dashed',
        // borderColor: 'pink',
    },
    label: {
        fontWeight: 600,
        textColor: '#aaa',
    }
})


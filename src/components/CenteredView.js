import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'

const CenteredView = ({ activity, children, label = null }) => (
    <View style={styles.container}>
        {activity && <ActivityIndicator size='large' />}
        {label && <Text style={styles.label}>{label}</Text>}
        {children}
    </View>
)

export default CenteredView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        marginTop: 20,
        fontSize: 20,
        lineHeight: 24,
        fontWeight: 600,
        textColor: '#aaa',
    }
})


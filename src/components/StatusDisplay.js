import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const StatusDisplay = ({ status }) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            {status}
        </Text>
    </View>
)

export default StatusDisplay

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        width: 375,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#f00',
        backgroundColor: '#faa',
    },
    text: {
        color: '#f00',
    },
})
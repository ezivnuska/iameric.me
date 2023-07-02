import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const Entry = ({ entry }) => (
    <View style={styles.container}>
        <Text style={styles.entry}>{entry}</Text>
    </View>
)

export default Entry

const styles = StyleSheet.create({
    container: {
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 5,
    },
    entry: {
        lineHeight: 40,
        fontWeight: 700,
        color: 'red',
    },
})
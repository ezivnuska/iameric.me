import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

const Brand = ({ onPress }) => (
    <TouchableOpacity
        style={styles.brand}
        onPress={onPress}
    >
        <Text style={styles.title}>
            iam
            <Text style={{ color: '#ddd' }}>
                eric
            </Text>
        </Text>
    </TouchableOpacity>
)

export default Brand

const styles = StyleSheet.create({
    brand: {
        margin: 0,
        paddingHorizontal: 10,
    },
    title: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        lineHeight: 45,
        fontSize: 25,
        fontWeight: 700,
        color: '#fff',
    },
})
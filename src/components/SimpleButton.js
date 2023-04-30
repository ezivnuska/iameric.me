import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

const SimpleButton = ({ children, onPress }) => {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

export default SimpleButton

const styles = StyleSheet.create({
    container: {

    }
})
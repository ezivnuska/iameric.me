import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

const Zach = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.zach}>I Am Zach.</Text>
        </View>
    )
}

export default Zach

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // borderWidth: 1,
        // borderStyle: 'dotted',
        // borderColor: 'red',
    },
    zach: {
        fontWeight: 700,
    },
})
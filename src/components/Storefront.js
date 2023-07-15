import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    MenuDisplay
} from '.'

const Storefront = ({ onComplete, vendor }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{vendor.username}</Text>
            <MenuDisplay vendor={vendor} />
        </View>
    )
}

export default Storefront

const styles = StyleSheet.create({
    container: {

    },
    title: {

    },
})
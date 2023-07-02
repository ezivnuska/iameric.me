import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import TextInputForm from '../components/TextInputForm'
// I don't know why this is causing errors when importing with curly brackets

const Layout = () => (
    <View style={styles.container}>
        <TextInputForm />
    </View>
)

export default Layout

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100%',
        padding: 20,
    },
})
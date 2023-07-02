import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { EntryModule } from '../components'

const Layout = () => (
    <View style={styles.container}>
        <EntryModule />
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
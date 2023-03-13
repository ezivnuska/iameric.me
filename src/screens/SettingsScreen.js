import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { Screen } from './'
import { EntryDisplay } from '../components'

const SettingsScreen = props => (
    <Screen { ...props }>
        <View style={styles.container}>
            <EntryDisplay />
        </View>
    </Screen>
)

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})
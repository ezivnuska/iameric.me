import React from 'react'
import { Screen } from '../components'
import {
    EntryDisplay, Module,
} from '../components'
import {
    StyleSheet,
    View,
} from 'react-native'

const ChatScreen = ({ navigation, ...props }) => (
    <Screen { ...props }>
        <View style={styles.container}>
            <Module>
                <EntryDisplay />
            </Module>
        </View>
    </Screen>
)

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
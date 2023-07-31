import React from 'react'
import { Screen } from '../components'
import {
    EntryDisplay,
} from '../components'
import {
    StyleSheet,
    View,
} from 'react-native'

const ChatScreen = ({ navigation, ...props }) => (
    <View style={styles.container}>
        <EntryDisplay />
    </View>
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
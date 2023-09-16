import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { navigate } from '../navigators/RootNavigation'
import main from '../styles/main'

const BackButton = ({ path = 'Home' }) => (
    <TouchableOpacity
        style={[styles.container]}
        onPress={() => navigate(path)}
    >
        <Text style={main.text}>&lt; Back</Text>
    </TouchableOpacity>
)

export default BackButton

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5, 
    },
})
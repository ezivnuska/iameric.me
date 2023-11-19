import React from 'react'
import {
    Text,
    TouchableOpacity,
} from 'react-native'
import { navigate } from '../navigators/RootNavigation'
import main from '../styles/main'

export default ({ path = 'Home' }) => (
    <TouchableOpacity
        onPress={() => navigate(path, { detail: null })}
    >
        <Text style={[main.text, main.paddedV]}>
            &lt; Back
        </Text>
    </TouchableOpacity>
)
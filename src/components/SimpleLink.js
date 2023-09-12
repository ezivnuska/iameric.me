import React from 'react'
import {
    Text,
    TouchableOpacity,
} from 'react-native'
import defaultStyles from '../styles/main'

const SimpleLink = ({ labelText, onPress }) => (
    <TouchableOpacity
        style={defaultStyles.linkContainer}
        onPress={onPress}
    >
        <Text
            style={defaultStyles.linkText}
            accessibilityLabel={labelText}
        >
            {labelText}
        </Text>
    </TouchableOpacity>
)

export default SimpleLink
import React from 'react'
import {
    Text,
} from 'react-native'
import defaultStyles from '../styles'

const DefaultText = ({ children, ...props }) => (
    <Text style={[defaultStyles.text, props.style]}>
        {children}
    </Text>
)

export default DefaultText
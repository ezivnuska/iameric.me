import React from 'react'
import {
    Text,
} from 'react-native'
import defaultStyles from '../styles'

const DefaultText = ({ children, ...props }) => (
    <Text style={props.style || defaultStyles.text}>
        {children}
    </Text>
)

export default DefaultText
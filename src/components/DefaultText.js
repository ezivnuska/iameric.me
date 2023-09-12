import React from 'react'
import {
    Text,
} from 'react-native'
import main from '../styles/main'

const DefaultText = ({ children, ...props }) => (
    <Text style={[main.text, props.style]}>
        {children}
    </Text>
)

export default DefaultText
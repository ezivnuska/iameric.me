import React from 'react'
import {
    Text,
} from 'react-native'
import main from '../styles/main'

const Heading = ({ children, ...props }) => (
    <Text style={[main.heading, props.style]}>{children}</Text>
)

export default Heading
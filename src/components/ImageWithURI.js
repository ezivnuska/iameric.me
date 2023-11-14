import React from 'react'
import {
    Image,
} from 'react-native'

export default ({ uri, ...props }) => (
    <Image
        {...props}
        uri={uri}
    />
)
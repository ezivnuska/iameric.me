import React from 'react'
import {
    Text,
    TouchableOpacity,
} from 'react-native'
import layout from '../styles/layout'

export default ({ onPress }) => (
    <TouchableOpacity
        style={{ paddingHorizontal: layout.horizontalPadding }}
        onPress={onPress}
    >
        <Text style={{
            lineHeight: 45,
            fontSize: 25,
            fontWeight: 700,
            color: '#fff',
        }}>
            iam
            <Text style={{ color: '#ddd' }}>
                eric
            </Text>
        </Text>
    </TouchableOpacity>
)
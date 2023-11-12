import React from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import main from '../styles/main'

export default ({ iconStyles, onPress }) => (
    <TouchableOpacity
        style={main.paddedH}
        onPress={onPress}
    >
        <Button shape='circle' icon={<EditOutlined style={iconStyles} />} />
    </TouchableOpacity>
)
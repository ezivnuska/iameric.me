import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default ({ iconStyle, onPress }) => (
    <Button
        size='small'
        shape='circle'
        icon={<PlusOutlined style={iconStyle} />}
        onClick={onPress}
    />
)
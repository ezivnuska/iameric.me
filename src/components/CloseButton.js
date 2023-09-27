import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default ({ iconStyle, onPress }) => (
    <Button onClick={onPress} size='small' shape='circle' icon={<CloseOutlined style={iconStyle} />} />
)
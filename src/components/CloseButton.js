import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import main from '../styles/main'

const CloseButton = ({ iconStyle, onPress }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <Button size='small' shape='circle' icon={<CloseOutlined style={iconStyle} />} />
    </TouchableOpacity>
)

export default CloseButton

const styles = StyleSheet.create({
    container: {
        paddingTop: 2, 
    },
})
import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import main from '../styles/main'

const AddButton = ({ iconStyle, onPress }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <Button size='small' shape='circle' icon={<PlusOutlined style={iconStyle} />} />
    </TouchableOpacity>
)

export default AddButton

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 7,
    },
})
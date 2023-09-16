import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import main from '../styles/main'

const EditButton = ({ iconStyles, onPress }) => (
    <TouchableOpacity
        style={[styles.container, main.paddedH]}
        onPress={onPress}
    >
        <Button shape='circle' icon={<EditOutlined style={iconStyles} />} />
    </TouchableOpacity>
)

export default EditButton

const styles = StyleSheet.create({
    container: {
        // paddingBottom: 5, 
    },
})
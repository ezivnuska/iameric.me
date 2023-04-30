import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SimpleButton } from './'
import { CloseCircleOutlined } from '@ant-design/icons'

const StatusDisplay = ({ close, status }) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            {status}
        </Text>
        <SimpleButton
            onPress={close}
        >
            <CloseCircleOutlined style={styles.icon} />
        </SimpleButton>
    </View>
)

export default StatusDisplay

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#0a0',
        backgroundColor: '#cfc',
        borderRadius: 10,
    },
    text: {
        flex: 1,
        color: '#0a0',
    },
    icon: {
        flex: 1,
        color: '#0a0',
    },
})
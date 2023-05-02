import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { SimpleButton } from './'
import { CloseCircleOutlined } from '@ant-design/icons'

const StatusDisplay = ({ close, status }) => (
    <View style={[styles.container, !status ? styles.hidden : null]}>
        <Text style={styles.text}>
            {status ? status : ''}
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
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        // borderWidth: 1,
        // borderColor: '#0a0',
        backgroundColor: '#cfc',
        // borderRadius: 10,
    },
    hidden: {
        visibility: 'hidden',
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
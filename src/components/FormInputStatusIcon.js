import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    CloseCircleOutlined,
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons'
import defaultStyles from '../styles'

const FormInputStatusIcon = ({ isLoading, isValid, ...props }) => isLoading ? (
    <View style={[defaultStyles.inputStatusIconBackground, styles.loading]}>
        <SyncOutlined spin style={defaultStyles.inputStatusIcon} />
    </View>
) : isValid ? (
    <View style={[defaultStyles.inputStatusIconBackground, styles.valid]}>
        <CheckCircleOutlined style={defaultStyles.inputStatusIcon} />
    </View>
) : (
    <View style={[defaultStyles.inputStatusIconBackground, styles.invalid]}>
        <CloseCircleOutlined style={defaultStyles.inputStatusIcon}  />
    </View>
)

export default FormInputStatusIcon

const styles = StyleSheet.create({
    loading: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'gray',
    },
    valid: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'green',
    },
    invalid: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'red',
    },
})
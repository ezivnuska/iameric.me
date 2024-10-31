import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import Icon from 'react-native-vector-icons/Ionicons'

const FormHeader = ({ title, close = null }) => {

    const { theme } = useApp()
    const { clearForm } = useForm()

    const handleClose = () => {
        clearForm()
        close()
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 10,
            }}
        >
            <ThemedText bold size={20}>
                {title}
            </ThemedText>

            <Pressable 
                onPress={handleClose}
                disabled={close === null}
            >
                <Icon
                    name={'close'}
                    size={24}
                    color={close !== null ? theme?.colors.textDefault : 'rgba(200, 200, 200, 0.5)'}
                />
            </Pressable>
        </View>
    )
}

export default FormHeader
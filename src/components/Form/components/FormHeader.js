import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import Icon from 'react-native-vector-icons/Ionicons'

const FormHeader = ({ title, close = null, color = '#000' }) => {

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
            <ThemedText
                bold
                size={24}
                color={color}
            >
                {title}
            </ThemedText>

            {close && (
                <Pressable 
                    onPress={handleClose}
                >
                    <Icon
                        name={'close'}
                        size={24}
                        color={theme?.colors.textDefault}
                    />
                </Pressable>
            )}
        </View>
    )
}

export default FormHeader
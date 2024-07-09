import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import { useModal } from '@modal'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ title }) => {

    const { theme } = useApp()
    const { clearForm } = useForm()
    const { closeModal } = useModal()

    const handleClose = () => {
        clearForm()
        closeModal()
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                paddingBottom: 10,
            }}
        >
            <ThemedText bold size={20}>
                {title}
            </ThemedText>

            <Pressable onPress={handleClose}>
                <Icon
                    name={'close'}
                    size={24}
                    color={theme?.colors.textDefault}
                />
            </Pressable>
        </View>
    )
}
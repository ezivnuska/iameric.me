import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useForm } from '@forms'
import { useModal } from '@modal'

export default FormHeader = ({ title }) => {

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
            }}
        >
            <ThemedText bold size={20}>
                {title}
            </ThemedText>

            <Pressable onPress={handleClose}>
                <ThemedText bold>X</ThemedText>
            </Pressable>
        </View>
    )
}
import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { useForm } from '@context'

const FormHeader = ({ title, close = null, color = '#000' }) => {

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
            <Text variant='titleLarge'>
                {title}
            </Text>

            {close && (
                <IconButton
                    icon='close'
                    onPress={handleClose}
                    size={25}
                />
            )}
        </View>
    )
}

export default FormHeader
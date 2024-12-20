import React from 'react'
import { Pressable, View } from 'react-native'
import { TextCopy } from '@components'
import { useApp, useForm } from '@context'
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
            <TextCopy
                bold
                size={24}
                color={color}
            >
                {title}
            </TextCopy>

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
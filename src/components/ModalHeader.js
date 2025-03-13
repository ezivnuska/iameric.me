import React from 'react'
import { View } from 'react-native'
import { HelperText, IconButton, Text } from'react-native-paper'
import { useForm, useModal } from '@context'

const ModalHeader = ({ title = '' }) => {

    const { formError } = useForm()
    const { closeModal } = useModal()
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text
                    variant='headlineSmall'
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}
                >
                    {title}
                </Text>

                <HelperText type='error' visible={true}>
                    {formError?.message || ' '}
                </HelperText>
            </View>

            <IconButton
                icon='close-thick'
                onPress={closeModal}
                style={{
                    margin: 0,
                    paddingHorizontal: 10,
                }}
            />
        </View>
    )
}

export default ModalHeader
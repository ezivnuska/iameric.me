import React, { useState } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Form } from '@components'
import { useForm, useModal, useTheme, useUser } from '@context'
import { setCaption } from '@utils/images'

const CaptionForm = ({ data }) => {
    
    const { formError, formFields, clearForm } = useForm()
    const { closeModal } = useModal()
    const { theme } = useTheme()
    const { updateImage } = useUser()
    const [loading, setLoading] = useState(false)

    const fields = [
        {
            name: 'caption',
            placeholder: 'give context...',
            multiline: true,
        }
    ]

    const handleCaption = async () => {
            
        if (formError) {
            return console.log(`Error in form field ${formError.name}: ${formError.message}`)
        }
        
        setLoading(true)

        const { caption } = await setCaption(data._id, formFields.caption)
        
        if (caption) {

            clearForm()

            updateImage({
                ...data,
                caption,
            })

            closeModal()

        } else {
            console.log('Error saving caption')
        }
        
        setLoading(false)
        
    }

    return (

        <View
            style={{
                flex: 1,
                gap: 10,
            }}
        >

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                    backgroundColor: theme.colors.background,
                }}
            >
                <Text
                    variant='headlineSmall'
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}
                >
                    Caption
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{
                        margin: 0,
                        paddingHorizontal: 5,
                    }}
                />
            </View>

            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                
                <Form
                    fields={fields}
                    data={data}
                    onSubmit={handleCaption}
                />

            </View>

        </View>
    )
}

export default CaptionForm
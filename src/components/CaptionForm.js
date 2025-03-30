import React, { useState } from 'react'
import { ScrollView } from'react-native'
import { IconButton, Text } from'react-native-paper'
import { Form, Row, Stack } from '@components'
import { useForm, useModal, useUser } from '@context'
import { setCaption } from '@utils/images'
import { Size } from '@utils/stack'

const CaptionForm = ({ data }) => {
    
    const { formError, formFields, clearForm } = useForm()
    const { closeModal } = useModal()
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
        <Stack
            flex={1}
        >
            <Row
                padding={[Size.XS, Size.XS, Size.None, Size.M]}
                align='center'
            >
                <Text
                    variant='headlineSmall'
                    style={{ flex: 1 }}
                >
                    Caption
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{ margin: 0, padding: 0 }}
                />

            </Row>

            <ScrollView
                style={{
                    marginVertical: 0,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Size.S,
                }}
            >

                <Stack
                    flex={1}
                    spacing={Size.M}
                    padding={[Size.S, Size.M]}
                >    
                    <Form
                        fields={fields}
                        data={data}
                        onSubmit={handleCaption}
                    />

                </Stack>

            </ScrollView>

        </Stack>
    )
}

export default CaptionForm
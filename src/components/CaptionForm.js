import React, { useEffect, useState } from 'react'
import { Card, IconButton } from 'react-native-paper'
import { Form } from '@components'
import { useForm, useModal, useUser } from '@context'
import { navigate } from '@utils/navigation'
import { setCaption } from '@utils/images'

const CaptionForm = ({ data }) => {
    
    const { formError, formFields, clearForm } = useForm()
    const { closeModal } = useModal()
    const { updateImage } = useUser()
    const [loading, setLoading] = useState(false)

    const fields = [
        {
            name: 'caption',
            placeholder: 'new caption...',
            multiline: true,
        }
    ]

    const handleCaption = async () => {
            
        if (formError) {
            return console.log(`Error in form field ${formError.name}: ${formError.message}`)
        }
        
        setLoading(true)

        const { caption } = await setCaption(data._id, formFields.caption)
        console.log('response', caption)
        if (caption) {

            clearForm()

            updateImage({
                ...data,
                caption,
            })
        
            // setImage({
            //     ...data,
            //     caption,
            // })

            closeModal()

        } else {
            console.log('Error saving caption')
        }
        
        setLoading(false)
        
    }

    return (

        <Card>

            <Card.Title
                title='Add Caption'
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card elevation={0}>

                <Card.Title
                    title='Edit Caption'
                    titleVariant='headlineSmall'
                    // subtitle='This action is irreversible.'
                    // subtitleVariant='bodyLarge'
                />

                <Card.Content style={{ marginTop: 10 }}>
                    <Form
                        fields={fields}
                        data={data}
                        onSubmit={handleCaption}
                    />
                </Card.Content>

            </Card>

        </Card>
    )
}

export default CaptionForm
import React, { useState } from 'react'
import { Form, ModalContainer } from '@components'
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
        <ModalContainer title='Caption'>
                
            <Form
                fields={fields}
                data={data}
                onSubmit={handleCaption}
            />

        </ModalContainer>
    )
}

export default CaptionForm
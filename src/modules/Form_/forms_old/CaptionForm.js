import React from 'react'
import { Form } from '@components'
import { useForm } from '@form'
import { useImages } from '@images'
import { setCaption } from '@utils/images'

const CaptionForm = ({ data = {}, onCancel = null }) => {

    const { updateImage } = useImages()

    const {
        clearForm,
        formError,
        formFields,
        setFormLoading,
    } = useForm()

    const handleSubmit = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}
        
        setFormLoading(true)
        const image = await setCaption(data._id, formFields.caption)
        setFormLoading(false)

        if (!image) console.log('Error saving caption', err)
        else {
            updateImage(image)
            clearForm()
            onCancel()
            return image
        }
    }

    return (
        <Form
            title='Add/Edit Caption'
            data={data}
            fields={[
                {
                    label: 'New Caption',
                    name: 'caption',
                    placeholder: 'new caption...',
                    multiline: false,
                }
            ]}
            onCancel={onCancel}
            onSubmit={handleSubmit}
        />
    )
}

export default CaptionForm
import React from 'react'
import { ModalHeader, Form } from '@components'
import { useForm } from '@form'
import { useImages } from '@images'
import { setCaption } from '@utils/images'

const Caption = ({ data = {}, onCancel = null }) => {

    const {
        updateImage,
        closeImagesModal,
    } = useImages()

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
        <View>
            <ModalHeader
                title='Caption'
                onClose={onCancel}
            />
            <Form
                // title={`${data?.caption ? 'Edit' : 'Add'} Caption`}
                data={data}
                fields={[
                    {
                        label: `${data?.caption ? 'Edit' : 'Add'} Caption`,
                        name: 'caption',
                        placeholder: 'new caption...',
                        multiline: false,
                    }
                ]}
                onCancel={onCancel}
                onSubmit={handleSubmit}
            />
        </View>
    )
}

export default Caption
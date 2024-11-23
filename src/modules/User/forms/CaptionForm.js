import React from 'react'
import { Form } from '@components'
import { useForm } from '@form'
import { useUser } from '@user'
import { setCaption } from '@utils/images'

const CaptionForm = ({ data }) => {

    const initialState = { text: data?.caption || '' }

    const {
        clearForm,
        clearFormError,
        focused,
        formError,
        formFields,
        formLoading,
        formReady,
        getDirty,
        getError,
        getFocus,
        initForm,
        markDirty,
        setFocus,
        setFormError,
        setFormLoading,
        setFormReady,
        setFormValues,
    } = useForm()

    const {
        clearUserModals,
        closeUserModal,
        setUserModal,
        updateImage,
    } = useUser()

    const handleSubmit = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}
        console.log('data._id', data._id)
        console.log('formFields.text', formFields.text)
        setFormLoading(true)
        const image = await setCaption(data._id, formFields.text)
        console.log('image returned', image)
        setFormLoading(false)

        if (!image) console.log('Error saving caption', err)
        else {
            updateImage(image)
            clearForm()
            // clearUserModals()
            closeUserModal()
            // setUserModal('SHOWCASE', image)
        }
    }

    return (
        <Form
            // title='Edit Caption'
            fields={[
                {
                    label: 'New Caption',
                    name: 'text',
                    placeholder: 'new caption...',
                    multiline: false,
                }
            ]}
            onCancel={closeUserModal}
            onSubmit={handleSubmit}
            data={initialState}
        />
    )
}

export default CaptionForm
import React from 'react'
import { Form } from '@components'
import { useForm } from '@form'
import { useImages } from '@images'
import { setCaption } from '@utils/images'

const CaptionForm = ({ data }) => {

    const initialState = { text: data?.caption || '' }
    
    const { updateImage } = useImages()

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
        // imagesModal,
        clearImagesModals,
        closeImagesModal,
        setImagesModal,
    } = useImages()

    // const [initialValues, setInitialValues] = useState(null)

    // const {
    //     text,
    // } = useMemo(() => formFields, [formFields])

    // useEffect(() => {
    //     const init = async () => {
    //         const fields = await getFields(initialState, data)
    //         setInitialValues(fields)
    //     }
    //     init()
    // }, [])
    
    // useEffect(() => {
    //     if (initialValues) initForm(initialValues)
    // }, [initialValues])

    // useEffect(() => {
    //     if (formReady) validateFields(formFields)
    // }, [formFields])

    // const validate = name => {
    //     let isValid = true
    //     switch (name) {
    //         case 'text':
    //             if (!text.length) {
    //                 setFormError({ name, message: 'caption invalid.'})
    //                 isValid = false
    //             }
    //             break
    //         default:
    //             // console.log('No field to validate')
    //     }

    //     if (isValid && getError(name)) {
    //         clearFormError()
    //         setFocus(0)
    //     } else {
    //         setFocus(name)
    //     }

    //     return isValid
    // }

    // const onChange = (key, value) => {
    //     if (!getDirty(key)) markDirty(key)
    //     setFormValues({ ...formFields, [key]: value })
    // }
    
    // const onEnter = e => {
	// 	if (e.code === 'Enter') submitFormData()
	// }

    const handleSubmit = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}
        // console.log('data._id', data._id)
        // console.log('formFields.text', formFields.text)
        setFormLoading(true)
        const image = await setCaption(data._id, formFields.text)
        setFormLoading(false)

        // console.log('image returned', image)

        if (!image) console.log('Error saving caption', err)
        else {
            updateImage(image)
            clearForm()
            clearImagesModals()
            setImagesModal('SHOWCASE', image)
        }
    }

    return (
        <Form
            // title='Add/Edit Caption'
            fields={[
                {
                    // label: 'Edit Caption',
                    name: 'text',
                    placeholder: 'caption...',
                    multiline: false,
                }
            ]}
            onCancel={closeImagesModal}
            onSubmit={handleSubmit}
            data={initialState}
        />
    )
}

export default CaptionForm
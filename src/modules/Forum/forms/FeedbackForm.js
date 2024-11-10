import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    FormField,
    FormHeader,
    SimpleButton,
} from '@components'
import { useUser } from '@user'
import { useForm } from '@form'
import {
    createEntry,
    getFields,
    validateFields,
} from './utils'

const FeedbackForm = ({ onCancel, onSubmit, data = null }) => {

    const originalMessage = data || ''
    const threadId = originalMessage?._id

    const initialState = { text: '' }

    const { user } = useUser()

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

    const [initialValues, setInitialValues] = useState(null)

    const {
        text,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const init = async () => {
            const fields = getFields(initialState)
            setInitialValues(fields)
        }
        init()
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validate)
    }, [text])

    const validate = name => {
        let isValid = true
        switch (name) {
            case 'text':
                if (!text.length) {
                    setFormError({ name, message: 'Entry invalid.'})
                    isValid = false
                }
                break
            default:
                // console.log('No field to validate')
        }

        if (isValid && getError(name)) {
            clearFormError()
            setFocus(0)
        } else {
            setFocus(name)
        }

        return isValid
    }

    const onChange = (key, value) => {
        if (!getDirty(key)) markDirty(key)
        setFormValues({ ...formFields, [key]: value })
    }
    
    const onEnter = e => {
		if (e.code === 'Enter') submitFormData()
	}

    const submitFormData = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}

        const { _id } = user

        let newEntry = {
            author: _id,
            text,
        }

        if (threadId) {
            newEntry = {
                ...newEntry,
                threadId,
            }
        } 
        
        setFormLoading(true)
        const entry = await createEntry(newEntry)
        setFormLoading(false)

        if (!entry) console.log('Error saving entry')
        else {
            clearForm()
            onSubmit(entry)
        }
    }

    const renderFields = () => (
        <>
            <FormField
                label='Add Comment'
                value={text}
                error={getError('text')}
                placeholder='say something...'
                textContentType='default'
                keyboardType='default'
                autoCapitalize='sentences'
                onChangeText={value => onChange('text', value)}
                autoFocus={getFocus('text')}
                onKeyPress={onEnter}
                dirty={getDirty('text')}
                multiline
            />
        </>
    )

    return focused !== null ? (
        <View
            style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
            }}
        >
            <FormHeader
                title='Feedback'
                close={onCancel}
            />

            {renderFields()}

            <SimpleButton
                label={formLoading ? 'Sending' : 'Send'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}

export default FeedbackForm
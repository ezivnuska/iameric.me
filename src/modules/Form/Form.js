import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    FormField,
    FormHeader,
    SimpleButton,
} from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import {
    // createPost,
    getFields,
    validateFields,
} from './utils'

const Form = ({ fields, onSubmit, onCancel }) => {

    const initialState = { text: '' }

    const { user } = useApp()

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

    // const values = useMemo(() => formFields, [formFields])

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

    // unique
    const validate = name => {
        let isValid = true
        switch (name) {
            case 'text':
                if (!text.length) {
                    setFormError({ name, message: 'Form invalid.'})
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

    const gatherFormData = () =>  {
        const { _id } = user
        return {
            author: _id,
            text,
        }
    }

    const submitFormData = async () => {
        
        if (formError) {
			console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
		}

        const data = gatherFormData()
        
        setFormLoading(true)
        console.log('do form stuff with new data...', data)
        const response = await createPost(data)
        setFormLoading(false)
        
        if (!response) console.log('Error saving data')
        else {
            clearForm()
            onSubmit(response)
        }
    }

    const renderFields = fields => fields.map((field, index) => {
        console.log('initi', initialValues)
        const { label, multiline, name, placeholder } = field
        return (
            <FormField
                key={`formfield-${index}-${name}`}
                label={label}
                // value={values[name] || ''}
                error={getError(name)}
                placeholder={placeholder}
                textContentType='default'
                keyboardType='default'
                autoCapitalize='sentences'
                // onChangeText={value => onChange(name, value)}
                autoFocus={getFocus(name)}
                onKeyPress={onEnter}
                dirty={getDirty(name)}
                multiline={multiline}
            />
        )
    })

    return focused !== null ? (
        <View
            style={{
                flexGrow: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
            }}
        >
            <FormHeader
                title='New Post'
                close={onCancel}
            />

            {initialValues && renderFields(fields)}

            <SimpleButton
                label={formLoading ? 'Sending' : 'Send'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}

export default Form
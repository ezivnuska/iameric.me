import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
    FormField,
    FormHeader,
} from './components'
import { SimpleButton } from '@components'
import { useApp } from '@app'
import {
    // FormContextProvider,
    useForm,
} from '@form'
import {
    // createPost,
    getFields,
    validateFields,
} from './utils'

const Form = ({ fields, title, onSubmit, onCancel, submitForm }) => {

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
        resetForm,
        setFocus,
        setFormError,
        setFormLoading,
        setFormReady,
        setFormValues,
    } = useForm()

    const initFields = () => {
        let state = {}
        fields.map(field => {
            state[field.name] = field.value || ''
        })
        const fieldValues = getFields(state)
        initForm(fieldValues)
    }

    useEffect(() => {
        initFields()

        return () => resetForm()
    }, [])

    useEffect(() => {
        let invalidField = validateFields(formFields)
        if (invalidField) {
            const { name, index } = invalidField
            setFormError({ name, message: `${name} field invalid.`})
            setFocus(index)
        } else {
            clearFormError()
            setFocus(0)
        }
    }, [formFields])

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
        const data = {
            author: _id,
            ...formFields,
        }
        
        setFormLoading(true)
        const response = await onSubmit(data)
        setFormLoading(false)
        
        if (!response) console.log('Error saving data')
        else resetForm()
    }

    const renderFields = () => fields.map((field, index) => {
        const { label, multiline, name, placeholder } = field
        return (
            <FormField
                key={`formfield-${index}-${name}`}
                label={label}
                value={formFields[name] || ''}
                error={getError(name)}
                placeholder={placeholder}
                textContentType='default'
                keyboardType='default'
                autoCapitalize='sentences'
                onChange={value => onChange(name, value)}
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
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
            }}
        >
            <FormHeader
                title={title}
                close={onCancel}
            />

            {formReady && renderFields(formFields)}

            <SimpleButton
                label={formLoading ? 'Sending' : 'Send'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}

export default Form
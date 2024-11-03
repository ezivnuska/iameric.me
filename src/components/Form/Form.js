import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
    FormField,
    FormHeader,
} from './components'
import { SimpleButton } from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import {
    getFields,
    validateFields,
} from './utils'

const Form = ({
    fields,
    title,
    onSubmit,
    onCancel,
}) => {

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
        // initFields()

        return () => resetForm()
    }, [])

    useEffect(() => {
        if (!formReady) initFields()
    }, [formReady])

    useEffect(() => {
        if (formReady) {
            console.log('form fields changed', formFields)
            if (formFields) {
                const fieldNames = Object.keys(formFields)
                console.log('mapping fieldNames', fieldNames)
                const dirtyValues = {}
                fieldNames.map(fieldName => {
                    const isDirty = getDirty(fieldName)
                    if (isDirty) dirtyValues[fieldName] = formFields[fieldName]
                })

                console.log('dirtyValues', dirtyValues)
                
                let error = validateFields(dirtyValues)
                
                if (error) {
                    const { name, message, index } = error
                    
                    setFormError({ name, message })
                    setFocus(index)
                } else {
                    clearFormError()
                    setFocus(0)
                }
            }
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
        
        let data = { ...formFields}
        
        if (user) data.author = user._id
        
        setFormLoading(true)
        const response = await onSubmit(data)
        setFormLoading(false)
        
        if (!response) console.log('Error submitting form data')
        else if (response.error) {
            console.log(`Form Error: ${response.name}: ${response.message}`)
        } else resetForm()
    }

    const renderFields = () => fields.map((field, index) => {
        const { label, multiline, name, placeholder, type } = field
        return (
            <View
                key={`formfield-${index}-${name}`}
            >
                <FormField
                    label={label}
                    value={formFields[name] || ''}
                    error={getError(name)}
                    placeholder={placeholder}
                    secureTextEntry={type === 'password'}
                    keyboardType='default'
                    autoCapitalize='sentences'
                    onChange={value => onChange(name, value)}
                    autoFocus={getFocus(name)}
                    onKeyPress={onEnter}
                    dirty={getDirty(name)}
                    multiline={multiline}
                />
            </View>
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
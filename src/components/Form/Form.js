import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
    FormField,
    FormHeader,
} from './components'
import { SimpleButton } from '@components'
import { useUser } from '@user'
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
    data = null,
}) => {

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
        
        const fieldValues = getFields(state, data)
        console.log('Field values', fieldValues)
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
            
            if (formFields) {
                const fieldNames = Object.keys(formFields)
                
                const dirtyValues = {}
                fieldNames.map(fieldName => {
                    const isDirty = getDirty(fieldName)
                    if (isDirty) dirtyValues[fieldName] = formFields[fieldName]
                })
                
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
        // console.log('onChange', key, value)
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
        
        let formData = {
            ...formFields,
            author: user?._id,
            // author: user?._id,
        }
        // console.log('submitting formFields', formFields)
        // console.log('submitting form data', formData)
        
        setFormLoading(true)
        const response = await onSubmit(formData)
        setFormLoading(false)
        console.log('response from form', response)
        if (!response) console.log('No response from data', formData)
        else if (response.error) {
            console.log(`Form Error: ${response.name}: ${response.message}`)
            setFormError(response)
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
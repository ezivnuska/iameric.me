import React, { useEffect } from 'react'
import { View } from 'react-native'
import { FormField, FormHeader } from './components'
import { SimpleButton } from '@components'
import { useForm, useUser } from '@context'
import { getFields, validateFields } from './utils'

const FormContainer = ({
    title,
    fields,
    onCancel,
    color = null,
    data = null,
    onSubmit = null,
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
        // console.log('Field values', fieldValues)
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
                const requiredFieldNames = fields.map(({ name }) => name)
                let values = {}
                requiredFieldNames.map(fieldName => {
                    values[fieldName] = formFields[fieldName]
                })
                let error = validateFields(values)
                
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

        // console.log('form response', response)
        
        if (!response) console.log('formData response', response)
        else if (response.error) {
            console.log(`Form Error: ${response.name}: ${response.message}`)
            setFormError(response)
        } else resetForm()
    }

    const renderFields = () => fields.map((field, index) => {
        const { label, multiline, name, placeholder, type, autoCapitalize } = field
        return (
            <View
                key={`formfield-${index}-${name}`}
                // style={{ flex: 1 }}
            >
                <FormField
                    // style={{ flex: 1 }}
                    label={label}
                    value={formFields[name] || ''}
                    error={getError(name)}
                    placeholder={placeholder}
                    secureTextEntry={type === 'password'}
                    keyboardType='default'
                    autoCapitalize={autoCapitalize || 'sentences'}
                    onChange={value => onChange(name, value)}
                    autoFocus={getFocus(name)}
                    onKeyPress={!multiline && onEnter}
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
                // width: '100%',
            }}
        >
            {title && (
                <FormHeader
                    title={title}
                    color={color}
                    close={onCancel}
                />
            )}

            {formReady && renderFields(formFields)}

            {onSubmit && (
                <SimpleButton
                    label={formLoading ? 'Sending' : 'Send'}
                    disabled={formLoading || formError}
                    onPress={submitFormData}
                />
            )}

        </View>
    ) : null
}

export default FormContainer
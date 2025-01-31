import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Appbar, Button, Card, IconButton, TextInput } from 'react-native-paper'
import { FormField, FormHeader } from './components'
import { SimpleButton, Time } from '@components'
import { useForm, useUser } from '@context'
import { getFields, validateFields } from './utils'

const Form = ({
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
        initFields()

        // return () => resetForm()
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
                style={{ flex: 1, gap: 10 }}
            >
                <TextInput
                    label={label}
                    value={formFields[name] || ''}
                    onChangeText={value => onChange(name, value)}
                    
                    style={{ flex: 1 }}
                    error={getError(name)}
                    placeholder={placeholder}
                    secureTextEntry={type === 'password'}
                    keyboardType='default'
                    autoCapitalize={autoCapitalize || 'sentences'}
                    autoFocus={getFocus(name)}
                    onKeyPress={!multiline && onEnter}
                    dirty={getDirty(name)}
                    multiline={multiline}
                />
                {/* <FormField
                    label={label}
                    value={formFields[name] || ''}
                    onChange={value => onChange(name, value)}
                    style={{ flex: 1 }}
                    error={getError(name)}
                    placeholder={placeholder}
                    secureTextEntry={type === 'password'}
                    keyboardType='default'
                    autoCapitalize={autoCapitalize || 'sentences'}
                    autoFocus={getFocus(name)}
                    onKeyPress={!multiline && onEnter}
                    dirty={getDirty(name)}
                    multiline={multiline}
                /> */}
            </View>
        )
    })
    
    return (
        <View style={{ flex: 1, gap: 10 }}>
            
            {/* {title && ( */}
                <Card.Title
                    title={title}
                    subtitle='The time is Now.'
                    // left={() => <UserAvatar user={item.author} />}
                    right={() => (
                        <IconButton 
                            icon='close-thick'
                            onPress={onCancel}
                            // disabled={loading}
                            // iconColor={MD3Colors.error50}
                            // size={25}
                        />
                    )}
                />
            {/* )} */}
            
            {/* <Image
                source={source}
                resizeMode='contain'
                style={{ flex: 1, flexGrow: 1 }}
            /> */}

            <Card.Content
                //
            >
                {formReady
                    ? renderFields(formFields)
                    : <ActivityIndicator size='medium' />
                }
            </Card.Content>
            
            {/* {(isOwner || hasAuthorization) && (
                <Card.Actions>
                    {isOwner && (
                        <Button
                            mode='text'
                            onPress={handleAvatar}
                        >
                            {isProfileImage ? 'Unset Avatar' : 'Set Avatar'}
                        </Button>
                    )}
                    {(
                        <Button
                            mode='text'
                            onPress={handleDelete}
                            disabled={loading}
                        >
                            Delete
                        </Button>
                    )}
                </Card.Actions>
            )} */}
        </View>
    )
    return focused !== null ? (
        <View
            style={{
                flex: 1,
                // width: '100%',
                borderWidth: 5,
                borderColor: 'yellow',
            }}
        >
            {title && (
                <Appbar.Header>
                    <Appbar.Content title={title} />
                    <Appbar.Action icon='close-thick' onPress={onCancel} />
                </Appbar.Header>
            )}

            {formReady && renderFields(formFields)}

            {onSubmit && (
                <Button
                    mode='contained'
                    onPress={submitFormData}
                    disabled={formLoading || formError}
                >
                    {formLoading ? 'Sending' : 'Send'}
                </Button>
            )}

        </View>
    ) : null
}

export default Form
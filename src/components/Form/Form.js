import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import {
    Button,
    Card,
    Divider,
    IconButton,
    TextInput,
} from 'react-native-paper'
import { useForm, useUser } from '@context'
import { getFields, validateFields } from './utils'

const Form = ({
    fields,
    onCancel = null,
    color = null,
    data = null,
    onSubmit = null,
    title = null,
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
        // console.log('fields', fields)
        // initFields()
        
        // return () => resetForm()
    }, [])
    
    useEffect(() => {
        console.log('formReady', formReady)
        if (!formReady) {
            console.log('fields', fields)
            initFields()
        }
    }, [formReady])

    useEffect(() => {
        console.log('formFields***', formFields)
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
        }
        
        setFormLoading(true)
        const response = await onSubmit(formData)
        setFormLoading(false)
        
        if (!response) console.log('no response from form', response)
        else if (response.error) {
            console.log(`Form Error: ${response.name}: ${response.message}`)
            setFormError(response)
        } else resetForm()
    }
    
    return (
        <View style={{ flex: 1, gap: 20 }}>

            {/* {title && (
                <Card.Title
                    title={title}
                    right={() => onCancel && <IconButton icon='close-thick' onPress={onCancel} />}
                />
            )} */}
            
            {/* <Card.Content> */}

                {formReady && (
                    <FlatList
                        ItemSeparatorComponent={({ highlighted }) => <Divider />}
                        data={fields}
                        keyExtractor={item => `item-${item.name}`}
                        // horizontal={landscape}
                        renderItem={({ item }) => {
                            console.log('item', item)
                            const {
                                label,
                                multiline,
                                name,
                                placeholder,
                                type,
                                autoCapitalize,
                            } = item
                            return (
                                // <View style={{ borderWidth: 1, borderColor: 'yellow' }}>
                                    <TextInput
                                        label={label}
                                        value={formFields[name] || ''}
                                        onChangeText={value => onChange(name, value)}
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
                                // </View>
                            )
                        }}
                    />
                )}
            {/* </Card.Content> */}

            {/* <Card.Actions style={{ marginVertical: 10 }}> */}
                <Button
                    mode='contained'
                    onPress={submitFormData}
                    disabled={formError}
                >
                    Submit
                </Button>
            {/* </Card.Actions> */}
        </View>
    )
}

export default Form
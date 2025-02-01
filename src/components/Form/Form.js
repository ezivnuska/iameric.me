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
        
        initForm(fieldValues)
    }

    useEffect(() => {
        // console.log('fields', fields)
        // initFields()
        
        // return () => resetForm()
    }, [])
    
    useEffect(() => {
        
        if (!formReady) {
            
            initFields()
        }
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
        <View
            // style={{
            //     // flex: 1,
            //     // gap: 20,
            //     // borderWidth: 1,
            // }}
        >

            {formReady && (
                <FlatList
                    // ItemSeparatorComponent={({ highlighted }) => <Divider />}
                    data={fields}
                    keyExtractor={item => `item-${item.name}`}
                    // horizontal={landscape}
                    renderItem={({ item }) => {
                        // console.log('item', item)
                        const {
                            label,
                            multiline,
                            name,
                            placeholder,
                            type,
                            autoCapitalize,
                        } = item
                        return (
                            // <View>
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
                                    style={{ marginBottom: 20 }}
                                />
                            // </View>
                        )
                    }}
                />
            )}
            
            <Button
                mode='contained'
                onPress={submitFormData}
                disabled={formError}
            >
                Submit
            </Button>
        </View>
    )
}

export default Form
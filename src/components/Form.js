import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useForm, useUser } from '@context'
import { getFields, validateFields } from '@utils/form'

const Form = ({
    fields,
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
        
        initForm(fieldValues)
    }
    
    useEffect(() => {
        
        return () => resetForm()
    }, [])

    useEffect(() => {
        
        if (!formReady) {
            
            initFields()
        }
        
    }, [formReady])

    useEffect(() => {
        
        if (formReady) {
            
            if (formFields) {

                let values = []
                
                fields.map(({ name, requirements }) => {
                    values.push({
                        name,
                        value: formFields[name],
                        requirements,
                    })
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

        if (formError) return console.log(`Error in form field ${formError.name}: ${formError.message}`)
        
        setFormLoading(true)
        const response = await onSubmit({
            author: user?._id,
            ...formFields,
        })

        setFormLoading(false)
        
        if (response) {
            if (response.error) {
                setFormError(response)
            } else resetForm()
        }
    }
    
    return formReady && (
        <FlatList
            data={fields}
            extraData={fields}
            keyExtractor={item => `item-${item.name}`}
            style={{ flex: 1 }}
            ItemSeparatorComponent={({ highlighted }) => (
                <View
                    style={[
                        // { height: 10 },
                        highlighted && { marginLeft: 0 },
                    ]}
                />
            )}
            ListFooterComponent={() => (
                <Button
                    mode='contained'
                    onPress={submitFormData}
                    disabled={formError}
                >
                    Submit
                </Button>
            )}
            ListFooterComponentStyle={{
                paddingTop: 10,
            }}
            renderItem={({ item }) => {
                
                const {
                    label,
                    multiline,
                    name,
                    placeholder,
                    type,
                    autoCapitalize,
                } = item

                return (
                    <View>
                        <TextInput
                            name={name}
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
                            rows={4}
                            // contentStyle={}
                        />

                        <HelperText
                            type={getDirty(name) ? 'error' : 'info'}
                            visible={formError && formError?.name === name}
                            style={{ paddingHorizontal: 0 }}
                        >
                            {formError?.message || ' '}
                        </HelperText>
                        
                    </View>
                )
            }}
        />
    )
}

export default Form
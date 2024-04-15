import React, { useEffect, useMemo, useState } from 'react'
import {
    View
} from 'react-native'
import {
    FormField,
    IconButton,
} from '.'
import axios from 'axios'
import {
    useForm,
    useForum,
    useModal,
    useUser,
} from '@context'

export default () => {

    const initialState = {
        entry: '',
    }

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
        setFormValues,
    } = useForm()

    const { addEntry } = useForum()
    const { closeModal, data } = useModal()
    const { profile } = useUser()

    const [initialValues, setInitialValues] = useState(initialState)

    const getFields = () => {
        console.log('')
        console.log('getting fields, data:', data)
        let values = initialState
        if (data) {
            console.log('getting fields, data:', data)
            const formKeys = Object.keys(values)
            const fields = {}
            formKeys.map(key => {
                if (data[key] !== undefined) {
                    fields[key] = data[key]
                }
            })
            console.log('filtered fields', fields)
            values = fields
        }
        console.log('values', values)
        return values
    }

    const {
        entry,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const fields = getFields()
        console.log('setting initialValues', fields)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        console.log('initialValues changed')
        console.log('initialValues', initialValues)
        if (formReady) {
            console.log('formReady', formReady)
            // const values = Object.keys(initialValues)
            // console.log('')
            // console.log('formFields', formFields)
            // console.log('initialValues', values)
            // console.log('')
            validateFields()
        } else {
            console.log('initForm', initialValues)
            initForm(initialValues)
        }
    }, [initialValues])

    useEffect(() => {
        if (formReady) {
            // const fields = Object.keys(formFields)
            // console.log('')
            // console.log('formFields', formFields)
            // console.log('fields', fields)
            // console.log('')
            validateFields()
        }
    }, [entry])

    const validateFields = () => {
        const values = Object.keys(initialValues)
        let index = 0
        while (index < values.length) {
            const key = values[index]
            const isValid = validateField(key)
            if (!isValid) {
                setFocus(key)
                return
            }
            index++
        }
        setFocus(values[0])
    }

    const validateField = name => {
        let isValid = true
        switch (name) {
            case 'entry':
                if (!entry.length) {
                    setFormError({ name, message: 'Entry invalid.'})
                    isValid = false
                }
                break
            default:
                console.log('No field to validate')
        }

        if (isValid && getError(name)) {
            clearFormError()
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

        const { _id } = profile

        const newEntry = {
            author: _id,
            text: entry,
        }

        console.log('newEntry', newEntry)
        
        setFormLoading(true)
        
        const response = await axios
            .post('/api/entry', newEntry)
        
        setFormLoading(false)

        if (!response.data) {
            console.log('Error saving entry', err)
        } else {
            addEntry(response.data.entry)
            clearForm()
            closeModal()
        }
    }

    const renderFields = () => (
        <>
            <FormField
                label='Add Comment'
                value={entry}
                error={getError('entry')}
                placeholder='say something...'
                textContentType='default'
                keyboardType='default'
                autoCapitalize='sentences'
                onChangeText={value => onChange('entry', value)}
                autoFocus={getFocus('entry')}
                onKeyPress={onEnter}
                dirty={getDirty('entry')}
                multiline
            />
        </>
    )

    return focused !== null ? (
        <View
            style={{ paddingVertical: 20 }}
        >
            <View style={{ marginBottom: 10 }}>
                {renderFields()}
            </View>

            <IconButton
                type='primary'
                label={formLoading ? 'Sending' : 'Send'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}
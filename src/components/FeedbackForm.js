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
    useUser,
} from '@context'
import { getFields, validateFields } from '@utils/form'

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
        setFormReady,
        setFormValues,
    } = useForm()

    const { addEntry, closeForumModal, getData } = useForum()
    const { profile } = useUser()

    const [initialValues, setInitialValues] = useState(null)

    const {
        entry,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const { data } = getData()
        const fields = getFields(initialState, data)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validate)
    }, [entry])

    const validate = name => {
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
            closeForumModal()
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
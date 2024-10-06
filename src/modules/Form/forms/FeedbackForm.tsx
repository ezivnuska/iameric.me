import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    FormField,
    FormHeader,
} from './components'
import { SimpleButton } from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import { useForum } from '@forum'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { getFields, validateFields } from './utils'
import { createEntry } from '@utils/forum'

export default ({ data }) => {

    const originalMessage = data
    const threadId = originalMessage?._id

    const initialState = { text: '' }

    const { user } = useApp()
    const { socket } = useSocket()

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

    const { addEntry } = useForum()

    const { closeModal } = useModal()

    const [initialValues, setInitialValues] = useState(null)

    const {
        text,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const init = async () => {
            const fields = getFields(initialState)
            setInitialValues(fields)
        }
        init()
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validate)
    }, [text])

    const validate = name => {
        let isValid = true
        switch (name) {
            case 'text':
                if (!text.length) {
                    setFormError({ name, message: 'Entry invalid.'})
                    isValid = false
                }
                break
            default:
                // console.log('No field to validate')
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

        const { _id } = user

        let newEntry = {
            author: _id,
            text,
        }

        if (threadId) {
            newEntry = {
                ...newEntry,
                threadId,
            }
        } 
        
        setFormLoading(true)
        const entry = await createEntry(newEntry)
        setFormLoading(false)

        if (!entry) console.log('Error saving entry', err)
        else {
            socket.emit('new_entry', entry)
            addEntry(entry)
            clearForm()
            closeModal()
        }
    }

    const renderFields = () => (
        <>
            <FormField
                label='Add Comment'
                value={text}
                error={getError('text')}
                placeholder='say something...'
                textContentType='default'
                keyboardType='default'
                autoCapitalize='sentences'
                onChangeText={value => onChange('text', value)}
                autoFocus={getFocus('text')}
                onKeyPress={onEnter}
                dirty={getDirty('text')}
                multiline
            />
        </>
    )

    return focused !== null ? (
        <View
            // style={{ paddingVertical: 20 }}
        >
            <FormHeader title='Feedback' />

            <View style={{ marginBottom: 10 }}>
                {renderFields()}
            </View>

            <SimpleButton
                label={formLoading ? 'Sending' : 'Send'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}
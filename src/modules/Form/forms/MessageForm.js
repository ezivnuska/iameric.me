import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { FormField, FormHeader } from './components'
import { SimpleButton } from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import { useMail } from '@mail'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { getFields, validateFields } from './utils'

export default ({ data }) => {

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

    const { addMessage } = useMail()
    const { closeModal } = useModal()

    const [initialValues, setInitialValues] = useState(null)

    const text = useMemo(() => formFields.text, [formFields])

    useEffect(() => {
        const init = async () => {
            const fields = getFields(initialState, data)
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

        const from = user._id
        const to = data._id

        const newMessage = {
            from,
            to,
            text,
        }
        
        setFormLoading(true)
        const message = await createMessage(newMessage)
        setFormLoading(false)

        if (!message) console.log('Error saving message', err)
        else {
            addMessage(message)
            socket.emit('new_message', message)
            clearForm()
            closeModal()
        }
    }

    const renderFields = () => (
        <>
            <FormField
                label={`Send new message to ${data.username}`}
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
            style={{ paddingVertical: 20 }}
        >
            <FormHeader title='Private Message' />

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
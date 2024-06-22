import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    FormField,
    IconButton,
} from '@components'
import {
    useApp,
    useForm,
    useForum,
    useModal,
} from '@context'
import { getFields, validateFields } from '@utils/form'
import { createEntry } from '@utils/forum'
import { classes } from '@styles'

export default ({ data }) => {

    const initialState = {
        text: '',
    }

    const {
        profile,
        socket,
    } = useApp()

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

    const {
        addEntry,
    } = useForum()

    const {
        closeModal,
    } = useModal()

    const [initialValues, setInitialValues] = useState(null)

    const {
        text,
    } = useMemo(() => formFields, [formFields])

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

        const { _id } = profile

        const newEntry = {
            author: _id,
            text,
        }
        
        setFormLoading(true)
        const entry = await createEntry(newEntry)
        setFormLoading(false)

        if (!entry) console.log('Error saving entry', err)
        else {
            console.log('>> new_entry <<', entry)
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
        <View style={classes.centerV}>
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
        </View>
    ) : null
}
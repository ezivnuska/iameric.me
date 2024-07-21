import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import {
    FormField,
    FormHeader,
} from './components'
import {
    destroy,
    getFields,
    validateFields,
} from './utils'
import { useForm } from '../FormContext'
import { navigate } from '@utils/navigation'
import { useApp } from '@app'
import { useSocket } from '@socket'

export default () => {

    const initialState = { username: '' }

    const { user } = useApp()

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

    // do we need to notify socket?
    const { notifySocket } = useSocket()

    const [initialValues, setInitialValues] = useState(null)

    const { username } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const fields = getFields(initialState)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validateField)
    }, [username])

    const onBurned = () => {
        clearForm()
        navigate('Home', { destroy: true })
    }

    const validateField = name => {
        let isValid = true
        switch (name) {
            case 'username':
                if (username !== user.username) {
                    setFormError({ name: 'username', message: 'Incorrect username' })
                    isValid = false
                } else {
                    if (
                        user.username === 'Driver' ||
                        user.username === 'Vendor' ||
                        user.username === 'Customer' ||
                        user.username === 'iameric'
                    ) {
                        setFormError({ name: 'username', message: 'Deletion not allowed' })
                        isValid = false
                    }
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

        setFormLoading(true)
		const { id } = await destroy(user._id)
        setFormLoading(false)

		if (!id) {
            console.log('Error destroying user: NULL')
            setFormError({ name: 'confirmUsername', message: 'Unsubscribe failed.' })
        } else {
            if (formError) clearFormError()
            onBurned(id)
		}
    }

    const renderFields = () => (
        <>
            <FormField
                label='Confirm Username'
                value={username}
                error={getError('username')}
                placeholder='username'
                textContentType='none'
                keyboardType='default'
                autoCapitalize='none'
                onChangeText={value => onChange('username', value)}
                autoFocus={getFocus('username')}
                onKeyPress={onEnter}
                dirty={getDirty('username')}
                required
            />
        </>
    )
    
    return (
        <View>

            <FormHeader title='Delete Account' />

            <ThemedText style={{ marginBottom: 15 }}>
                Enter username to permanently close account and delete all data.
            </ThemedText>

            {focused !== null ? (
                <>
                    <View style={{ marginBottom: 10 }}>
                        {renderFields()}
                    </View>

                    <SimpleButton
                        label={formLoading ? 'Burning...' : 'Burn it all.'}
                        // disabled={formLoading || formError}
                        onPress={submitFormData}
                    />
                </>
            ) : null}
        </View>
    )
}
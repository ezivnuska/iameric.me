import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FormField,
    IconButton,
    ThemedText,
} from '@components'
import { unsubscribe } from '@utils/auth'
import { cleanStorage } from '@utils/storage'
import { getFields } from '@utils/form'
import classes from '@styles/classes'
import {
    useForm,
    useModal,
    useUser,
} from '@context'

export default () => {

    const initialState = {
        username: '',
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

    const { signOut } = useApp()
    const { profile, clearUser } = useUser()
    const { closeModal, data } = useModal()

    const [initialValues, setInitialValues] = useState(null)

    const {
        username,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const fields = getFields(initialState, data)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields()
    }, [username])

    const validateFields = () => {
        const keys = Object.keys(formFields)
        let index = 0
        while (index < keys.length) {
            const key = keys[index]
            const isValid = validateField(key)
            if (!isValid) return
            else index++
        }
    }

    const validateField = name => {
        let isValid = true
        switch (name) {
            case 'username':
                if (username !== profile.username) {
                    setFormError({ name: 'username', message: 'Incorrect username.' })
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

        setFormLoading(true)
        
		const unsubscribed = await unsubscribe(profile._id)
        
        setFormLoading(false)

		if (!unsubscribed) {
            console.log('Error unsubscribing user: NULL')
            setFormError({ name: 'confirmUsername', message: 'Unsubscribe failed.' })
        } else {
            if (formError) clearFormError()
            signOut()
            clearUser()
            cleanStorage()
            clearForm()
            closeModal()
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
            />
        </>
    )
    
    return (
        <View>

            <View
                style={{ paddingVertical: 20 }}
            >
                <ThemedText style={classes.headerSecondary}>
                    Delete Account and Data
                </ThemedText>

                <ThemedText>
                    Enter your username to close your account and 
                    permanently delete all of your data.
                </ThemedText>

                {focused !== null ? (
                    <>
                        <View style={{ marginBottom: 10 }}>
                            {renderFields()}
                        </View>

                        <IconButton
                            type='primary'
                            label={formLoading ? 'Burning...' : 'Burn it all.'}
                            disabled={formLoading || formError}
                            onPress={submitFormData}
                        />
                    </>
                ) : null}
            </View>
        </View>
    )
}
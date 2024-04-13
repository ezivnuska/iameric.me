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
import classes from '@styles/classes'
import {
    useAuth,
    useForm,
    useModal,
    useUser,
} from '@context'

export default () => {

    const initialValues = {
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
        setFormValues,
    } = useForm()

    const {
        signOut,
    } = useAuth()

    const { closeModal } = useModal()
    const { profile, clearUser } = useUser()

    useEffect(() => {
        initForm(initialValues)
    }, [])

    useEffect(() => {
        if (formReady) {
            validateFields()
        }
    }, [formReady, formFields])

    const validateFields = () => {
        const values = Object.keys(initialValues)
        const fields = Object.keys(formFields)
        let index = 0
        while (index < values.length) {
            const key = fields[index]
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
            case 'username':
                if (formFields.username !== profile.username) {
                    setFormError({ name: 'username', message: 'Incorrect username.' })
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
                value={formFields.username}
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
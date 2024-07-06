import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { FormField } from './components'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { unsubscribe } from '@utils/auth'
import { getFields, validateFields } from '../utils'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'
import { useApp } from '@app'
import { useSocket } from '../../../SocketContext'
import { useForm } from '../FormContext'

export default DestroyForm = () => {

    const initialState = {
        username: '',
    }

    const {
        setUser,
        user,
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
        notifySocket,
    } = useSocket()

    const [initialValues, setInitialValues] = useState(null)

    const {
        username,
    } = useMemo(() => formFields, [formFields])

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

    const handleSignout = async id => {
        await signout(id)
        cleanStorage()
        notifySocket('user_signed_out', id)
        setUser(null)
    }

    // const validateFields = () => {
    //     const keys = Object.keys(formFields)
    //     let index = 0
    //     while (index < keys.length) {
    //         const key = keys[index]
    //         const isValid = validateField(key)
    //         if (!isValid) return
    //         else index++
    //     }
    // }

    const validateField = name => {
        let isValid = true
        switch (name) {
            case 'username':
                if (username !== user.username) {
                    setFormError({ name: 'username', message: 'Incorrect username.' })
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

        setFormLoading(true)
		const { id } = await unsubscribe(user._id)
        console.log('unsubscribe id', id)
        setFormLoading(false)

		if (!id) {
            console.log('Error unsubscribing user: NULL')
            setFormError({ name: 'confirmUsername', message: 'Unsubscribe failed.' })
        } else {
            if (formError) clearFormError()
            handleSignout(id)
            // clearForm()
            // clearImages()
            // clearCart()
            // clearProducts()
            // clearUser()
            // signOut()
            // closeModal()
            // cleanStorage()
            // removeContact(id)
            // socket.emit('account_deleted', id)
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

            <View>


                <View style={{ paddingVertical: 10 }}>
                    <ThemedText bold>
                        Delete Account
                    </ThemedText>
                </View>

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
        </View>
    )
}
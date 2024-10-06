import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { FormField, FormHeader } from './components'
import { SimpleButton } from '@components'
import {
    getFields,
    isValidEmail,
    signin,
    validateFields,
} from './utils'
import { setItem, storeToken } from '@utils/storage'
import { useForm } from '../FormContext'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useSocket } from '@socket'

export default SignInForm = () => {

    const initialState = {
        email: '',
        password: '',
    }

    const {
        dims,
        setUser,
        // socket,
        // userId,
    } = useApp()

    const { closeModal } = useModal()

    const {
        notifySocket,
    } = useSocket()
    
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

    const [initialValues, setInitialValues] = useState(null)

    const {
        email,
        password,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const fields = getFields(initialState, formFields)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validateField)
    }, [email, password])

    const validateField = name => {
        let isValid = true
        switch (name) {
            case 'email':
                if (!isValidEmail(email)) {
                    setFormError({ name, message: 'Email invalid.'})
                    isValid = false
                }
                break
            case 'password':
                if (!password.length) {
                    setFormError({ name, message: 'Password required.'})
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
		await setItem('email', email)
		const user = await signin(email, password)
        setFormLoading(false)
        
		if (!user) {
            setFormError({ name: 'email', message: 'Signin failed.' })
        } else {
            if (formError) clearFormError()
            storeToken(user.token)
            setUser(user)
            clearForm()
            closeModal()
            notifySocket('user_signed_in', {
                userId: user._id,
                username: user.username,
            })
		}

    }

    const renderFields = () => (
        <>
            <FormField
                label='Email'
                value={email}
                error={getError('email')}
                placeholder='email'
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={value => onChange('email', value)}
                autoFocus={getFocus('email')}
                onKeyPress={onEnter}
                dirty={getDirty('email')}
                required
                onFocus={() => setFocus('email')}
                focused={focused === 'email'}
            />
            <FormField
                label='Password'
                value={password}
                error={getError('password')}
                placeholder='password'
                textContentType='password'
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={value => onChange('password', value)}
                autoFocus={getFocus('password')}
                onKeyPress={onEnter}
                dirty={getDirty('password')}
                required
                onFocus={() => setFocus('password')}
                focused={focused === 'password'}
            />
        </>
    )
    
    return focused !== null ? (
        <View
            style={{
                width: '100%',
                maxWidth: dims.width,
            }}
        >
            <FormHeader title='Sign In' />

            <View style={{ marginVertical: 10 }}>
                {formReady && renderFields()}
            </View>

            <SimpleButton
                label={formLoading ? 'Signing In' : 'Sign In'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />

        </View>
    ) : null
}
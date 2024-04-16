import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
    FormField,
} from '@components'
import { setItem } from '@utils/storage'
import { isValidEmail, signup } from '@utils/auth'
import { getFields } from '@utils/form'
import {
    useAuth,
    useForm,
    useModal,
    useUser,
} from '@context'

export default ({ role }) => {

    const initialState = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
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

    const { signIn } = useAuth()
    const { closeModal, data } = useModal()
    const { setUser } = useUser()

    const [initialValues, setInitialValues] = useState(null)

    const {
        email,
        username,
        password,
        confirmPassword,
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
    }, [email, username, password, confirmPassword])

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
            case 'email':
                if (!isValidEmail(email)) {
                    setFormError({ name, message: 'Email invalid.'})
                    isValid = false
                }
                break
            case 'username':
                if (!username.length) {
                    setFormError({ name, message: 'Username required.'})
                    isValid = false
                }
                break
            case 'password':
                if (!password.length) {
                    setFormError({ name, message: 'Password required.'})
                    isValid = false
                }
                break
            case 'confirmPassword':
                if (password.length && confirmPassword !== password) {
                    setFormError({ name, message: 'Passwords must match.'})
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

		await setItem('email', email)
        
		const { data } = await signup(email, password, role, username)
        
        setFormLoading(false)
        
		if (!data) {
            console.log('Error authenticating user: NULL')
            setFormError({ name: 'email', message: 'Signup failed.' })
        } else if (data.error) {
			console.log(`Signup error: ${data.error}`)
            setFormError({ name: 'email', message: 'Authentication failed.' })
		} else {
            if (formError) clearFormError()
            const { _id, email, images, profileImage, role, token, username, exp } = data.user
            signIn(token)
            setUser({ _id, email, images, profileImage, role, token, username, exp })
            clearForm()
            closeModal()
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
            />
            <FormField
                label='Username'
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
            />
            <FormField
                label='Confirm Password'
                value={confirmPassword}
                error={getError('confirmPassword')}
                placeholder='confirm password'
                textContentType='password'
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={value => onChange('confirmPassword', value)}
                autoFocus={getFocus('confirmPassword')}
                onKeyPress={onEnter}
                dirty={getDirty('confirmPassword')}
            />
        </>
    )
    
    return focused !== null ? (
        <View
            style={{ paddingVertical: 20 }}
        >
            {renderFields()}
            <IconButton
                type='primary'
                label={formLoading ? 'Signing Up' : 'Sign Up'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />            
        </View>
    ) : null
}
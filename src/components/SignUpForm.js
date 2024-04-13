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
import {
    useAuth,
    useForm,
    useModal,
    useUser,
} from '@context'

export default ({ role }) => {

    const initialValues = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    }

    const {
        clearForm,
        clearFormError,
        formError,
        formFields,
        formLoading,
        initForm,
        setFormError,
        setFormLoading,
        setFormValues,
    } = useForm()

    const {
        signIn,
    } = useAuth()

    const { closeModal } = useModal()
    const { setUser } = useUser()

    const { email, username, password, confirmPassword } = useMemo(() => ({
        ...initialValues,
        ...formFields,
    }), [formFields, initialValues])

    const [focused, setFocused] = useState(null)
    const dirtyFields = useMemo(() => [], [])

    useEffect(() => {
        initForm({ email, username, password, confirmPassword })
    }, [])

    useEffect(() => {
        const fields = Object.keys(formFields)
        const values = Object.keys(initialValues)
        if (fields.length === values.length) {
            validateFields()
        } else {
            fields.map(key => {
                if (formFields[key].length) {
                    dirtyFields.push(key)
                    console.log('pushed dirty', dirtyFields)
                }
            })
        }
        
    }, [formFields])

    const onChange = (key, value) => {
        dirtyFields.push(key)
        setFormValues({ ...formFields, [key]: value })
    }

    const validateFields = () => {
        const keys = Object.keys(formFields)
        let index = 0
        while (index < keys.length) {
            const key = keys[index]
            const isValid = validateField(key)
            if (!isValid) {
                setFocused(index)
                return
            }
            else index++
        }
        setFocused(index)
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

        if (isValid && formError && formError.name === name) {
            clearFormError()
        }

        return isValid
    }

    const hasError = name => {
        if (formError && formError.name === name) {
            return formError.message
        }
        else return false
    }

    const isFieldFocused = name => {
        if (focused) {
            const keys = Object.keys(formFields)
            const keyFocused = keys[focused]
            if (keyFocused === name) {
                return true
            }
        }
        return false
    }

    const isFieldDirty = key => {
        return dirtyFields.indexOf(key) > -1
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
                error={hasError('email')}
                placeholder='email'
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={value => onChange('email', value)}
                autoFocus={isFieldFocused('email')}
                onKeyPress={onEnter}
                dirty={isFieldDirty('email')}
            />
            <FormField
                label='Username'
                value={username}
                error={hasError('username')}
                placeholder='username'
                textContentType='none'
                keyboardType='default'
                autoCapitalize='none'
                onChangeText={value => onChange('username', value)}
                autoFocus={isFieldFocused('username')}
                onKeyPress={onEnter}
                dirty={isFieldDirty('username')}
            />
            <FormField
                label='Password'
                value={password}
                error={hasError('password')}
                placeholder='password'
                textContentType='password'
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={value => onChange('password', value)}
                autoFocus={isFieldFocused('password')}
                onKeyPress={onEnter}
                dirty={isFieldDirty('password')}
            />
            <FormField
                label='Confirm Password'
                value={confirmPassword}
                error={hasError('confirmPassword')}
                placeholder='confirm password'
                textContentType='password'
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={value => onChange('confirmPassword', value)}
                autoFocus={isFieldFocused('confirmPassword')}
                onKeyPress={onEnter}
                dirty={isFieldDirty('confirmPassword')}
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
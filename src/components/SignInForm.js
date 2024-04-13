import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
    FormField,
} from '@components'
import { setItem } from '@utils/storage'
import { isValidEmail, signin } from '@utils/auth'
import classes from '@styles/classes'
import {
    useApp,
    useAuth,
    useForm,
    useModal,
    useUser,
} from '@context'

export default () => {

    const initialValues = {
        email: '',
        password: '',
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

    const { email, password } = useMemo(() => ({
        ...initialValues,
        ...formFields,
    }), [formFields, initialValues])

    const [focused, setFocused] = useState(null)
    const dirtyFields = useMemo(() => [], [])

    useEffect(() => {
        initForm({ email, password })
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
                console.log(`${key} is invalid`)
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
            case 'password':
                if (!password.length) {
                    setFormError({ name, message: 'Password required.'})
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
        
		const data = await signin(email, password)
        
        setFormLoading(false)
        
		if (!data) {
            console.log('Error authenticating user: NULL')
            setFormError({ name: 'email', message: 'Signin failed.' })
        } else if (data.error) {
			console.log(`Signin error: ${data.error}`)
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
        </>
    )
    
    return focused !== null ? (
        <View
            style={{ paddingVertical: 20 }}
        >
            <View style={{ marginBottom: 10 }}>
                {renderFields()}
            </View>

            <IconButton
                type='primary'
                label={formLoading ? 'Signing In' : 'Sign In'}
                disabled={formLoading || formError}
                onPress={submitFormData}
            />
        </View>
    ) : null
}
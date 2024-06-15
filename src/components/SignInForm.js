import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FormField,
    IconButton,
} from '@components'
import {
    useApp,
    useContacts,
    useForm,
    useModal,
} from '@context'
import { setItem } from '@utils/storage'
import {
    isValidEmail,
    signin,
} from '@utils/auth'
import { getFields } from '@utils/form'
import { classes } from '@styles'

export default () => {

    const initialState = {
        email: '',
        password: '',
    }

    const {
        signIn,
        socket,
        userId,
    } = useApp()
    const { updateStatus } = useContacts()
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
    const { clearModal, setNewModal } = useModal()

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
        if (formReady) validateFields()
    }, [email, password])

    useEffect(() => {
        if (userId) {
            // navigationRef.navigate('Main')
            clearModal()
        }
    }, [userId])

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
            signIn(user)
            clearForm()
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
                onFocus={() => {
                    console.log('focus', 'email')
                    setFocus('email')
                }}
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
                onFocus={() => {
                    console.log('focus', 'password')
                    setFocus('password')
                }}
                focused={focused === 'password'}
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
                    label={formLoading ? 'Signing In' : 'Sign In'}
                    disabled={formLoading || formError}
                    onPress={submitFormData}
                />

                <IconButton
                    label='Sign Up'
                    onPress={() => setNewModal('SIGNUP')}
                    style={{ padding: 10 }}
                    transparent
                />

            </View>
        </View>
    ) : null
}
import React, { useEffect, useMemo, useState } from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    FormField,
    IconButton,
    ThemedText,
} from '@components'
import { setItem } from '@utils/storage'
import { isValidEmail, signup } from '@utils/auth'
import { getFields } from '@utils/form'
import {
    useApp,
    useContacts,
    useForm,
    useModal,
} from '@context'
import { classes } from '@styles'
import Icon from 'react-native-vector-icons/Ionicons'

const PublicCheckbox = ({ checked, setChecked }) => {
    const { theme } = useApp()
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <Icon
                name={checked ? 'ellipse' : 'ellipse-outline'}
                size={24}
                onPress={() => setChecked(!checked)}
                color={theme?.colors.textDefault}
            />
            <ThemedText>Public Accomodation</ThemedText>
        </View>
    )
}

export default () => {

    const initialState = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        fiction: false,
    }

    const {
        addContact,
    } = useContacts()

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
        setUser,
        socket,
        signIn,
        userId,
    } = useApp()
    const { clearModal, data, setNewModal } = useModal()

    const [initialValues, setInitialValues] = useState(null)

    const {
        email,
        username,
        password,
        confirmPassword,
        fiction,
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

    useEffect(() => {
        if (userId) clearModal()
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
			return console.log(`Error in form field ${formError.name}: ${formError.message}`)
		}

		await setItem('email', email)

        setFormLoading(true)
		const user = await signup(email, password, username, fiction)
        setFormLoading(false)
        
		if (!user) {
            setFormError({ name: 'email', message: 'Signup failed.' })
        } else {
            if (formError) clearFormError()
            signIn(user)
            addContact(user)
            clearForm()
            socket.emit('user_added', user)
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
                required
                onFocus={() => {
                    console.log('focus', 'username')
                    setFocus('username')
                }}
                focused={focused === 'username'}
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
                required
                onFocus={() => {
                    console.log('focus', 'confirmPassword')
                    setFocus('confirmPassword')
                }}
                focused={focused === 'confirmPassword'}
            />
            <PublicCheckbox checked={fiction} setChecked={value => onChange('fiction', value)} />
        </>
    )
    
    return focused !== null ? (
        <View style={classes.centerV}>

            <View style={{ paddingVertical: 20 }}>

                <ThemedText style={[classes.headerSecondary, { marginBottom: 10 }]}>Sign Up</ThemedText>

                {renderFields()}
                
                <View
                    style={{
                        flexBasis: 'auto',
                        marginVertical: 10,
                        marginHorizontal: 'auto',
                    }}
                >
                    <IconButton
                        type='primary'
                        label={formLoading ? 'Signing Up' : 'Sign Up'}
                        disabled={formLoading || formError}
                        onPress={submitFormData}
                    />
                    
                    <IconButton
                        label='Sign In'
                        onPress={() => setNewModal('SIGN_IN')}
                        style={{ paddingVertical: 10 }}
                        transparent
                    />
                </View>

            </View>
            
        </View>
    ) : null
}
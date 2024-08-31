import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { FormField } from './components'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import {
    getFields,
    isValidEmail,
    signup,
    validateFields,
} from './utils'
import { setItem, storeToken } from '@utils/storage'
import { useApp } from '@app'
import { useForm } from '../FormContext'
import { useModal } from '@modal'
import { useSocket } from '@socket'
// import Icon from 'react-native-vector-icons/Ionicons'

// const PublicCheckbox = ({ checked, setChecked }) => {
//     const { theme } = useApp()
//     return (
//         <View
//             style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 gap: 10,
//                 marginBottom: 15,
//             }}
//         >
//             <Icon
//                 name={checked ? 'ellipse' : 'ellipse-outline'}
//                 size={24}
//                 onPress={() => setChecked(!checked)}
//                 color={theme?.colors.textDefault}
//             />
//             <ThemedText>Public Accomodation</ThemedText>
//         </View>
//     )
// }

export default SignUpForm = () => {

    const initialState = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        // fiction: false,
    }

    const {
        dims,
        setUser,
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
        username,
        password,
        confirmPassword,
        // fiction,
    } = useMemo(() => formFields, [formFields])

    useEffect(() => {
        const fields = getFields(initialState, formFields)
        // initForm(fields)
        setInitialValues(fields)
    }, [])
    
    useEffect(() => {
        if (initialValues) initForm(initialValues)
    }, [initialValues])

    useEffect(() => {
        if (formReady) validateFields(formFields, validateField)
    }, [email, username, password, confirmPassword])

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

        setFormLoading(true)
		await setItem('email', email)
		const user = await signup(email, password, username)
        setFormLoading(false)
        
		if (!user) {
            setFormError({ name: 'email', message: 'Signup failed.' })
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
            {/* <PublicCheckbox checked={fiction} setChecked={value => onChange('fiction', value)} /> */}
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
                onFocus={() => setFocus('username')}
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
                onFocus={() => setFocus('password')}
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
                onFocus={() => setFocus('confirmPassword')}
                focused={focused === 'confirmPassword'}
            />
        </>
    )
    
    return focused !== null ? (
        <View
            style={{
                // paddingVertical: 20,
                width: '100%',
                maxWidth: dims.width,
            }}
        >
            <ThemedText bold size={20}>
                Sign Up
            </ThemedText>

            <View style={{ marginVertical: 10 }}>
                {formReady && renderFields()}
            </View>

            <SimpleButton
                label={formLoading ? 'Signing Up' : 'Sign Up'}
                // disabled={formLoading || formError}
                onPress={submitFormData}
            />
            
        </View>
    ) : null
}
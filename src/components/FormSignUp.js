import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
    TextInput,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '.'
import classes from '../styles/classes'
import { AppContext } from '../AppContext'
import { saveLocally, getLocally } from '../utils/storage'
import { isValidEmail, signup } from '../utils/auth'
import { useTheme } from 'react-native-paper'

export default ({ role }) => {
    
    const {
        dispatch,
        isLandscape,
        loading,
    } = useContext(AppContext)

    const [focused, setFocused] = useState(0)
    
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState(null)
	const [formReady, setFormReady] = useState(false)
    
    const formFields = useMemo(() => ({ email, username, password, confirmPassword }), [email, username, password, confirmPassword])

	useEffect(() => {
		initForm()
	}, [])

	const initForm = async () => {
		const savedEmail = await getLocally('email')
		if (savedEmail) setEmail(savedEmail)
	}

    useEffect(() => {
        validateFields()
    }, [email, username, password, confirmPassword])
    
    useEffect(() => {
        if (focused) setFormReady(true)
    }, [focused])

    useEffect(() => {
        if (formReady) {
            // console.log('formFields---------->', formFields)
        }
    }, [formReady])

    const validateFields = async () => {
        const keys = Object.keys(formFields)
        let index = 0
        while (index < keys.length) {
            const currentField = keys[index]
            const isValid = await isFieldValid(currentField)
            // console.log(currentField, isValid)
            if (!isValid) {
                setFocused(index)
                return
            } else {
                index++
            }
        }
        
        setFormReady(true)
    }

    const isFieldValid = async fieldName => {
        if (fieldName === 'email') {
            if (isValidEmail(email)) {
                if (error) setError(null)
                return true
            } else {
                setError({ name: fieldName, message: 'Email is not valid.' })
                return false
            }
        } else if (fieldName === 'username' && !username.length) {
            setError({
                name: fieldName,
                message: `${fieldName} is required.`,
            })
            return false
        } else if (fieldName === 'password' && !password.length) {
            setError({
                name: fieldName,
                message: `${fieldName} is required.`,
            })
            return false
        } else if (fieldName === 'confirmPassword') {
            if(password !== confirmPassword) setError({
                name: fieldName,
                message: 'Password is not confirmed.'
            })
            return false
        }
        return true
        
    }

    const setUser = ({
        _id, email, images, profileImage, role, token, username, exp,
    }) => dispatch({
        type: 'SET_USER',
        user: {
            _id, email, images, profileImage, role, token, username, exp,
        },
    })

    const isFieldFocused = name => {
        const keys = Object.keys(formFields)
        return keys[focused] === name
    }

    const onComplete = response => {
        setUser(response)
        dispatch({ type: 'CLOSE_MODAL' })
    }

    const hasError = name => error && error.name === name

	const onEnter = e => {
		if (e.code === 'Enter') submitData()
	}
	
	const submitData = async () => {
		if (error) {
			return console.log('Please correct form errors.')
		}

		dispatch({ type: 'SET_LOADING', loading: 'Signing in...' })

		await saveLocally('email', email)

		const data = await signup(email, password, role, username)
        
		if (!data || !data.user) {
			console.log('Error authenticating user')
            setError({ name: 'email', message: 'Authentication failed.' })
		} else {
            if (error) setError(null)
			onComplete(data.user)
		}

		dispatch({ type: 'SET_LOADING', loading: null })
	}

    return formReady ? (
        <View
            style={{
                height: '100%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: isLandscape ? 10 : 'auto',
            }}
        >
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: isLandscape ? 'flex-start' : 'stretch',
                    gap: 7,
                    paddingVertical: isLandscape ? 50 : 0,
                }}
            >
                <FormInput
                    label='Email'
                    value={email}
                    onChange={setEmail}
                    placeholder='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    invalid={hasError('email')}
                    autoFocus={isFieldFocused('email')}
                    onKeyPress={onEnter}
                />

                <FormInput
                    label='Username'
                    value={username}
                    onChange={setUsername}
                    placeholder='username'
                    textContentType='none'
                    keyboardType='default'
                    autoCapitalize='none'
                    invalid={hasError('username')}
                    autoFocus={isFieldFocused('username')}
                    onKeyPress={onEnter}
                />

                <FormInput
                    label='Password'
                    value={password}
                    onChange={setPassword}
                    placeholder='password'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    invalid={hasError('password')}
                    autoFocus={isFieldFocused('password')}
                    onKeyPress={onEnter}
                />

                <FormInput
                    label='Confirm Password'
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder='password again'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    invalid={hasError('confirmPassword')}
                    autoFocus={isFieldFocused('confirmPassword')}
                    onKeyPress={onEnter}
                />

                <View
                    style={{
                        paddingLeft: isLandscape ? 110 : 0,
                        flex: 1,
                    }}
                >
                    <ThemedText
                        style={{
                            marginBottom: 7,
                            color: '#f55',
                        }}
                    >
                        {error ? error.message : ' '}
                    </ThemedText>
        
                    <IconButton
                        type='primary'
                        label={loading ? 'Signing Up' : 'Sign Up'}
                        disabled={loading || error}
                        onPress={submitData}
                    />
                </View>

            </View>
        </View>
    ) : null
}

const FormInput = ({
    invalid,
    label,
    onChange,
    value,
    multiline = false,
    ...props
}) => {
    
    const theme = useTheme()
    
    const {
        isLandscape,
    } = useContext(AppContext)

    const [dirty, setDirty] = useState(false)
    const [inputHeight, setInputHeight] = useState()

    const onInput = value => {
        setDirty(true)
        onChange(value)
    }
    
    return (
        <View
            style={{
                flexBasis: 'auto',
                display: 'flex',
                flexDirection: isLandscape ? 'row' : 'column',
                justifyContent: 'flex-start',
                alignItems: isLandscape ? 'center' : 'flex-start',
                gap: isLandscape ? 10 : 0,
                width: '100%',
            }}
        >
            <View
                style={{
                    flexBasis: isLandscape ? 100 : 'auto',
                }}
            >
                <ThemedText
                    style={[
                        classes.formInputLabel,
                        {
                            paddingBottom: 2,
                            color: theme?.colors.inputLabel,
                        }
                    ]}
                >
                    {label}
                </ThemedText>
            </View>

            <View
                style={{
                    flexBasis: isLandscape ? '100%' : 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                }}
            >
                <View
                    style={[
                        classes.formInputContainer,
                        { borderBottomColor: (!invalid && !dirty) ? '#fff' : invalid ? '#f00' : '#1f1' },
                    ]}
                >
                    
                    <View
                        style={{
                            backgroundColor: multiline ? theme?.colors.modalBackground : theme?.colors.inputBackground,
                            height: multiline ? Math.max(35, inputHeight) : 40,
                        }}
                    >
                        <TextInput
                            value={value}
                            onChangeText={onInput}
                            onContentSizeChange={e => setInputHeight(e.nativeEvent.contentSize.height)}
                            style={[
                                multiline ? classes.formTextArea : classes.formInput,
                                {
                                    flex: 1,
                                    color: theme?.colors.inputText,
                                    placeholderTextColor: theme?.colors.inputPlaceholder,
                                    backgroundColor: 'transparent',
                                    lineHeight: multiline ? 22 : 40,
                                    height: multiline ? Math.max(35, inputHeight) : 40,
                                    flexWrap: multiline ? 'wrap' : 'nowrap',
                                    maxWidth: 300,
                                },
                            ]}
                            {...props}
                        />

                    </View>
                    
                </View>

            </View>

        </View>
    )
}
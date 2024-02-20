import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	View,
} from 'react-native'
import {
	FormInput,
	IconButton,
	ThemedText,
} from '.'
import classes from '../styles/classes'
import {
	isValidEmail,
	signup,
} from '../utils/auth'
import { saveLocally, getLocally } from '../utils/storage'
import { AppContext } from '../AppContext'

export default ({ role, onComplete }) => {

	const {
		dispatch,
		loading,
	} = useContext(AppContext)
	
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		initForm()
	}, [])

	useEffect(() => {
		validateForm()
	}, [email, username, password, confirmPassword])

	useEffect(() => {
		if (email.length && !isValidEmail(email)) addError('email')
		else removeError('email')
	}, [email])

	useEffect(() => {
		if (
			(password.length && confirmPassword.length) &&
			(password !== confirmPassword)
		) addError('password')
		else removeError('password')
	}, [password, confirmPassword])

	const addError = value => {
		if (!hasError(value)) setErrors([ ...errors, value ])
	}

	const removeError = value => {
		if (hasError(value)) setErrors(errors.filter(item => item !== value))
	}

	const initForm = async () => {
		const savedEmail = await getLocally('email')
		if (savedEmail) setEmail(savedEmail)
	}

	const hasError = value => {
		const errorFound = errors.filter(error => error === value)
		return errorFound.length > 0
	}

	const validateForm = () => {
		if (!email.length || !isValidEmail(email)) {
			if (!email.length) setErrorMessage('Email is required.')
			else if (!isValidEmail(email)) setErrorMessage('Email is invalid.')
			return false
		} else {
			removeError('email')
			setErrorMessage(null)
		}
		if (!username.length) {
			setErrorMessage('Username is required.')
			return false
		}
		if (!password.length) {
			setErrorMessage('Password is required.')
			return false
		} else {
			removeError('password')
			setErrorMessage(null)
		}
		if (!confirmPassword.length) {
			setErrorMessage('Password confirmation required.')
			return false
		} else {
			removeError('password')
			setErrorMessage(null)
		}
		if (password !== confirmPassword) {
			setErrorMessage('Passwords do not match.')
			return false
		} else {
			removeError('password')
			setErrorMessage(null)
		}

		return true
	}

	const isValid = () => {
		let valid = true
		if (
			!email.length ||
			!username.length ||
			!password.length ||
			!confirmPassword.length
		) {
			console.log('All fields are required.')
			valid = false
		}

		if (!isValidEmail(email)) {
			console.log('No a valid email address.')
			valid = false
		}

		if (password !== confirmPassword) {
			console.log('Passwords do not match')
			valid = false
		}

		return valid
	}

	const handleError = ({ invalidField, msg }) => {
		addError(invalidField)
		setErrorMessage(msg)
	}

	const submitData = async () => {

		if (!isValid()) {
			return console.log('Could not verify form data.')
		}

		dispatch({ type: 'SET_LOADING', loading: 'Singing up...' })

		await saveLocally('email', email)
		
		const { data } = await signup(email, password, role, username)
		
		dispatch({ type: 'SET_LOADING', loading: null })

		if (data && data.user) {
			onComplete(data.user)
		} else if (data) {
			handleError(data)
		} else {
			console.log('Error signing up new user')
		}
	}

	const onEnter = e => {
        if (e.code === 'Enter') submitData()
    }

	return (			
		<View style={classes.formContainer}>

			<ThemedText
				style={[
					classes.headerSecondary,
					{ textAlign: 'center' },
				]}
			>
				Sign Up
			</ThemedText>

			<FormInput
				label='Email'
				value={email}
				onChange={value => setEmail(value)}
				placeholder='email'
				textContentType='emailAddress'
				autoCapitalize='none'
				keyboardType='email-address'
				invalid={hasError('email')}
				onKeyPress={onEnter}
			/>

			<FormInput
				label='Username'
				value={username}
				onChange={value => setUsername(value)}
				placeholder='username'
				textContentType='none'
				autoCapitalize='none'
				keyboardType='default'
				onKeyPress={onEnter}
			/>

			<FormInput
				label='Password'
				value={password}
				onChange={value => setPassword(value)}
				placeholder='password'
				textContentType='password'
				autoCapitalize='none'
				keyboardType='default'
				secureTextEntry={true}
				invalid={hasError('password')}
				onKeyPress={onEnter}
			/>

			<FormInput
				label='Confirm Password'
				value={confirmPassword}
				onChange={value => setConfirmPassword(value)}
				placeholder='password again'
				textContentType='password'
				autoCapitalize='none'
				keyboardType='default'
				secureTextEntry={true}
				invalid={hasError('password')}
				onKeyPress={onEnter}
			/>

			<ThemedText
				style={{
					marginBottom: 15,
					color: '#f00'
				}}
			>
				{errorMessage || ' '}
			</ThemedText>

			<IconButton
				type='primary'
				label={loading ? 'Signing Up' : 'Sign Up'}
				disabled={loading || !isValid() || errors.length}
				onPress={submitData}
			/>

		</View>
	)
}
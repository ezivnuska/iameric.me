import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
	FormInput,
	IconButton,
	LoadingView,
	ThemedText,
} from '.'
import classes from '../styles/classes'
import { isValidEmail, signin } from '../utils/auth'
import { saveLocally, getLocally } from '../utils/storage'

export default ({ onComplete }) => {

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [formReady, setFormReady] = useState(false)

	useEffect(() => {
		initForm()
	}, [])

	useEffect(() => {
		validateForm()
	}, [email, password])

	useEffect(() => {
		if (email.length && !isValidEmail(email)) addError('email')
		else removeError('email')
	}, [email])

	const addError = value => {
		if (!hasError(value)) setErrors([ ...errors, value ])
	}

	const removeError = value => {
		if (hasError(value)) setErrors(errors.filter(item => item !== value))
	}

	const initForm = async () => {
		const savedEmail = await getLocally('email')
		if (savedEmail) {
			setEmail(savedEmail)
		}
		setFormReady(true)
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
		if (!password.length) {
			setErrorMessage('Password is required.')
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
			!password.length
		) {
			valid = false
		}

		if (!isValidEmail(email)) {
			valid = false
		}

		return valid
	}

	const handleError = ({ invalidField, msg }) => {
		console.log('handleError', msg)
		addError(invalidField)
		setErrorMessage(msg)
	}
	
	const submitData = async () => {
		if (!isValid()) {
			return console.log('Could not verifiy credentials.')
		}

		saveLocally('email', email)
		setLoading(true)

		const data = await signin(email, password)
		// console.log('data', data)
		if (data && data.user) {
			onComplete(data.user)
		} else if (data) {
			handleError(data)
		} else {
			console.log('Error authenticating user')
		}

		setLoading(false)
	}

	const onEnter = e => {
		if (e.code === 'Enter') submitData()
	}

    return formReady
		? (
			<View
				style={classes.formContainer}
			>
	
				<ThemedText
					style={[
						classes.headerSecondary,
						{ textAlign: 'center' },
					]}
				>
					Sign In
				</ThemedText>
	
				<FormInput
					label='Email'
					value={email}
					onChange={value => setEmail(value)}
					placeholder='Email'
					textContentType='emailAddress'
					autoCapitalize='none'
					keyboardType='email-address'
					invalid={hasError('email')}
					onKeyPress={onEnter}
					autoFocus={!email.length}
				/>
	
				<FormInput
					label='Password'
					value={password}
					onChange={value => setPassword(value)}
					placeholder='Password'
					textContentType='password'
					autoCapitalize='none'
					secureTextEntry={true}
					invalid={hasError('password')}
					onKeyPress={onEnter}
					autoFocus={email.length}
				/>
	
				
				<ThemedText style={{ marginBottom: 15 }}>
					{errorMessage || ' '}
				</ThemedText>
	
				<IconButton
					type='primary'
					label={loading ? 'Signing In' : 'Sign In'}
					disabled={loading || !isValid() || errors.length}
					onPress={submitData}
				/>
	
			</View>
		) : <LoadingView label='loading form...' />
}
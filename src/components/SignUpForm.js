import React, { useEffect, useState } from 'react'
import {
	Text,
	View,
} from 'react-native'
import defaultStyles from '../styles/main'
import {
	FormInput,
	IconButton,
	RolePicker,
} from '.'
import { isValidEmail } from '../utils/tools'
import { signup } from '../Data'
import { storeEmail, getSavedEmail } from '../utils/storage'

export default ({ onComplete }) => {
	
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [role, setRole] = useState('driver')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
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
		const savedEmail = await getSavedEmail()
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

		storeEmail(email)
		setLoading(true)
		
		const { data } = await signup(email, password, role, username)
		
		if (data && data.user) {
			onComplete(data.user)
		} else if (data) {
			handleError(data)
		} else {
			console.log('Error signing up new user')
		}

		setLoading(false)
	}

	const onEnter = e => {
        if (e.code === 'Enter') submitData()
    }

	return (			
		<View style={defaultStyles.formContainer}>

			<View
				style={defaultStyles.form}
			>

				<Text style={[defaultStyles.title, { textAlign: 'center', color: '#fff' }]}>Sign Up</Text>

				<RolePicker
					value={role}
					onChange={value => setRole(value)}
					onKeyPress={onEnter}
				/>

				<FormInput
					label='Email'
					value={email}
					onChange={value => setEmail(value)}
					placeholder='email'
					textContentType='emailAddress'
					autoCapitalize='none'
					keyboardType='email-address'
					style={defaultStyles.input}
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
					style={defaultStyles.input}
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
					style={defaultStyles.input}
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
					style={defaultStyles.input}
					invalid={hasError('password')}
					onKeyPress={onEnter}
				/>

				<Text
					style={{
						color: '#f00',
						marginBottom: 15,
				}}>
					{errorMessage || ' '}
				</Text>

				<IconButton
					label={loading ? 'Signing Up' : 'Sign Up'}
					disabled={loading || !isValid() || errors.length}
					onClick={submitData}
					bgColor={loading ? 'gray' : 'blue'}
				/>

			</View>

		</View>
	)
}
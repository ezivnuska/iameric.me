import React, { useEffect, useState } from 'react'
import {
	Text,
	View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import defaultStyles from '../styles/main'
import { FormInput, RolePicker } from '.'
import { Button } from 'antd'
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
	
	const onChangeRole = value => setRole(value)
	const onChangeEmail = value => setEmail(value)
	const onChangeUsername = value => setUsername(value)
	const onChangePassword = value => setPassword(value)
	const onChangeConfirmPassword = value => setConfirmPassword(value)

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
					onChange={onChangeRole}
					onKeyPress={onEnter}
				/>

				<FormInput
					label='Email'
					value={email}
					onChangeText={onChangeEmail}
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
					onChangeText={onChangeUsername}
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
					onChangeText={onChangePassword}
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
					onChangeText={onChangeConfirmPassword}
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

				<Button
					size='large'
					type='primary'
					disabled={loading}
					onClick={submitData}
					style={{ color: '#fff' }}
				>
					{loading ? 'Signing Up' : 'Sign Up'}
				</Button>

			</View>

		</View>
	)
}
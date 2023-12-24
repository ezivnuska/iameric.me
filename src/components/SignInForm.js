import React, { useEffect, useState } from 'react'
import {
	Text,
    View,
} from 'react-native'
import {
	FormInput,
} from '.'
import defaultStyles from '../styles/main'
import { signin } from '../Data'
import { isValidEmail } from '../utils/tools'
import { storeEmail, getSavedEmail } from '../utils/storage'
import { Button } from 'antd'

const SignInForm = ({ onComplete, setUser }) => {

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		initForm()
	}, [])

	useEffect(() => {
		validateForm()
	}, [email, password])

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

		return valid
	}

	const handleError = ({ invalidField, msg }) => {
		addError(invalidField)
		setErrorMessage(msg)
	}
	
	const submitData = async () => {
		if (!isValid()) {
			return console.log('Could not verifiy credentials.')
		}

		storeEmail(email)
		setLoading(true)

		const response = await signin(email, password)
		
		if (response && response.error) {
			handleError(response)
		} else if (response) {
			setUser(response)
			onComplete()
		} else {
			console.log('Error authenticating user')
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

            	<Text style={[defaultStyles.title, { color: '#fff', textAlign: 'center' }]}>Sign In</Text>

				<FormInput
					label='Email'
					value={email}
					onChange={value => setEmail(value)}
					placeholder='Email'
					textContentType='emailAddress'
					autoCapitalize='none'
					keyboardType='email-address'
					style={defaultStyles.input}
					invalid={hasError('email')}
					onKeyPress={onEnter}
				/>

				<FormInput
					label='Password'
					value={password}
					onChange={value => setPassword(value)}
					placeholder='Password'
					textContentType='password'
					autoCapitalize='none'
					secureTextEntry={true}
					style={defaultStyles.input}
					invalid={hasError('password')}
					onKeyPress={onEnter}
				/>

				{errorMessage && (
					<Text
						style={{
							color: '#f00',
							marginBottom: 15,
					}}>
						{errorMessage}
					</Text>
				)}

				<Button
					size='large'
					type='primary'
					disabled={loading || !isValid() || errors.length}
					onClick={submitData}
					style={{ color: '#fff' }}
				>
					{loading ? 'Signing In' : 'Sign In'}
				</Button>

			</View>

		</View>
    )
}

export default SignInForm
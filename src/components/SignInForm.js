import React, { useContext, useEffect, useState } from 'react'
import {
	Text,
	TextInput,
	TouchableOpacity,
    View,
} from 'react-native'
import {
	FormInput,
} from '.'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles/main'
import { signin } from '../Data'
import { Button } from 'antd'

const SignInForm = ({ setUser, onComplete }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

	const [formReady, setFormReady] = useState(false)
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [invalid, setInvalid] = useState(null)

	useEffect(() => {
		initForm()
	}, [])

	const initForm = async () => {
		const storedEmail = await AsyncStorage.getItem('email')
		if (storedEmail) setEmail(storedEmail)
		setFormReady(true)
	}

	const authenticateUser = async () => {
		setLoading(true)
		const user = await axios
			.post('/api/signin', { email, password })
			.then(({ data }) => data)
		
			console.log('signin data', user)
		if (!user) {
			console.log('Error authenitcating user')
			return null
		}
		setLoading(false)
		storeEmail(email)
		setUser(user)
		setPassword('')
	}

	const storeEmail = async email => {
		try {
			await AsyncStorage.setItem('email', email)
		} catch (err) {
			console.log('Error storing email.', err)
		}
	}

	const validateEmail = async email => await axios
		.post('/api/user/get', { email })
		.then(({ data }) => {
			const { err, msg, user } = data
			if (err) console.log('Error getting user from email.', err)
			if (!user) console.log('Could not find user with email:', email)
			return user !== null
		})
		.catch(err => {
			console.log('Error getting user', err)
			return false
		})
	
	const onSubmit = async () => {
		
		if (!email.length || !password.length)
		console.log('Email and password are required.')
		setLoading(true)
		const connectedUser = await signin(email, password)
		if (!connectedUser) {
			console.log('Error authenticating user')
			return null
		}
		setLoading(false)
		storeEmail(email)
		setUser(connectedUser)
		setPassword('')
		onComplete()
	}

	const isValidEmail = () =>  email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)

    return (
        <View style={defaultStyles.formContainer}>
					
			<View style={defaultStyles.form}>

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
				/>

				<Button
					size='large'
					type='primary'
					disabled={loading}
					onClick={onSubmit}
					style={{ color: '#fff' }}
				>
					Connect
				</Button>

			</View>

		</View>
    )
}

export default SignInForm
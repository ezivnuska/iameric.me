import React, { useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'

const SignUpForm = ({ updateStatus }) => {

	const {
        state,
        dispatch,
    } = useContext(AppContext)

  const { user } = state
  
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeEmail = value => setEmail(value)
  const onChangeUsername = value => setUsername(value)
  const onChangePassword = value => setPassword(value)
  const onChangeConfirmPassword = value => setConfirmPassword(value)

  useEffect(() => {
    if (user) navigate('private')
  }, [user])

  useEffect(() => {
	const getEmail = async () => {
	  await AsyncStorage
		.getItem('email')
		.then(result => {
		  if (!result) return console.log('no email found in local storage')
		  setEmail(result)
	  })
	}
    getEmail()
  }, [])

  const setUser = user => {
	updateStatus('Storing user in cookie...')
    AsyncStorage
      .setItem('userToken', user.token)
      .then(() => {
        updateStatus('User saved.')
		dispatch({ type: 'SET_USER', user })
		navigate('private')
      })
      .catch(err => {
		updateStatus('Error storing user.')
		console.log('Erro saving user to local storage:', err)
	})
  }

  const sendData = async user => {
	updateStatus('Storing email...')
	await AsyncStorage
	  .setItem('email', user.email)
	  .then(() => {
		updateStatus('Email stored.')
		setEmail(user.email)
	  })
	
	updateStatus('Attempting sign up...')
    axios
      .post('/api/signup', user)
      .then(result => {
		if (result) {
			updateStatus('Sign up successful.')
			setUser(result)
		} else {

		}
		setLoading(false)
      })
      .catch(err => {
        updateStatus('Error signing up.')
		setLoading(false)
        console.log('Error signing up new user.', err)
      })
  }

  const onSubmit = () => {
    
    if (!email.length || !password.length || !confirmPassword.length)
      return updateStatus('Email and password required.')

    if (password !== confirmPassword)
      return updateStatus('Passwords do not match')
    
	setLoading(true)
    sendData({ email, username, password })
  }

	return (
				
		<View style={defaultStyles.form}>

			<Text style={defaultStyles.title}>Sign Up</Text>
			
			<TextInput
				style={defaultStyles.input}
				// onBlur={onBlur}
				onChangeText={onChangeEmail}
				value={email}
				placeholder='Email'
				textContentType='emailAddress'
				autoCapitalize='none'
				keyboardType='email-address'
			/>

			<TextInput
				style={defaultStyles.input}
				// onBlur={onBlur}
				onChangeText={onChangeUsername}
				value={username}
				placeholder='Username'
				textContentType='username'
				autoCapitalize='none'
			/>

			<TextInput
				style={defaultStyles.input}
				// onBlur={onBlur}
				onChangeText={onChangePassword}
				value={password}
				placeholder='Password'
				textContentType='password'
				secureTextEntry={true}
			/>

			<TextInput
				style={defaultStyles.input}
				// onBlur={onBlur}
				onChangeText={onChangeConfirmPassword}
				value={confirmPassword}
				placeholder='Confirm Password'
				textContentType='password'
				secureTextEntry={true}
			/>

			<TouchableOpacity
				style={[defaultStyles.button, (loading ? defaultStyles.buttonDisabled : null)]}
				disabled={loading}
				onPress={onSubmit}
			>
				<Text
					style={[defaultStyles.buttonLabel, (loading ? defaultStyles.buttonLabelDisabled : null)]}
					accessibilityLabel='Sign Up'
				>
					{loading ? 'Signing Up' : 'Sign Up'}
				</Text>
			</TouchableOpacity>

		</View>
	)
}

export default SignUpForm

const styles = StyleSheet.create({
	rootError: {
		color: 'red',
	},
	activity: {
		marginTop: 20,
	},
})
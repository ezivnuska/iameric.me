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
import { FormInput, RolePicker } from '.'

const SignUpForm = ({ updateStatus, setUser }) => {

	const {
        state,
        dispatch,
    } = useContext(AppContext)

  const { user } = state
  
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('driver')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeRole = value => setRole(value)
  const onChangeEmail = value => setEmail(value)
  const onChangeUsername = value => setUsername(value)
  const onChangePassword = value => setPassword(value)
  const onChangeConfirmPassword = value => setConfirmPassword(value)

  useEffect(() => {
    if (user) navigate('home')
  }, [user])

  useEffect(() => {
	const storeEmail = async () => {
		await AsyncStorage
			.getItem('email')
			.then(result => {
				if (!result) console.log('no email found in local storage')
				else setEmail(result)
			})
			.catch(err => console.log('Error getting stored email', err))
	}
	storeEmail()
  }, [])

  const sendData = async user => {
	updateStatus('Storing email...')
	await AsyncStorage
	  .setItem('email', user.email)
	  .then(() => {
		updateStatus('Email stored.')
		setEmail(user.email)
	  })
	
	updateStatus('Attempting sign up...')
	setLoading(true)
    axios
      .post('/api/signup', user)
      .then(({ data }) => {
		if (user) {
			updateStatus('Sign up successful.')
			setUser(user)
		} else {
			console.log('Sign up failed to create user.')
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
	
    if (!username.length) return updateStatus('Username is required.')

    if (password !== confirmPassword)
      return updateStatus('Passwords do not match')
    
    sendData({ email, username, password, role })
  }
  	const selectRole = role => {
		setRole(role)
	}

	return (
				
		<View style={defaultStyles.form}>

			<Text style={defaultStyles.title}>Sign Up</Text>

			<RolePicker
				value={role}
				onChange={selectRole}
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
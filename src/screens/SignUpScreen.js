import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Screen } from './'
import { SignUpForm } from '../components'

const SignUpScreen = props => {

	return (
		<Screen { ...props }>
			<View style={styles.container}>
				<SignUpForm />
			</View>
		</Screen>
	)
}

export default SignUpScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 'auto',
		minWidth: 375,
		maxWidth: 400,
		width: '100%',
	},
})
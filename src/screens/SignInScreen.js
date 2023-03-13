import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
	Screen,
} from './'
import { SignInForm } from '../components'

const SignInScreen = props => (
	<Screen { ...props }>
		<View style={styles.container}>
			<SignInForm />
		</View>
	</Screen>
)

export default SignInScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'column',
		// justifyContent: 'flex-start',
		// alignItems: 'center',
		marginHorizontal: 'auto',
		minWidth: 375,
		maxWidth: 400,
		width: '100%',
	},
	rootError: {
		color: 'red',
	},
	activity: {
		marginTop: 20,
	},
})
import {
    Dimensions,
    StyleSheet,
} from 'react-native'

const windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    text: {
        fontHeight: 20,
		lineHeight: 24,
    },
    heading: {
        fontHeight: 25,
    },
    email: {
        color: '#0000ff',
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    form: {
        display: 'flex',
		flexDirection: 'column',
		flexShrink: 0,
        flexGrow: 1,
		justifyContent: 'flex-start',
		width: '100%',
		alignSelf: 'center',
		paddingBottom: 15,
	},
	label: {
		fontSize: 20,
		fontWeight: '600',
		padding: 5,
		color: '#fff',
		marginTop: 5,
	},
	input: {
		height: 40,
		color: '#000',
		paddingHorizontal: 10,
		fontSize: 18,
		lineHeight: 23,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ccc',
		marginBottom: 5,
		borderRadius: 10,
	},
	rootError: {
		color: 'red',
	},
	button: {
		paddingHorizontal: 20,
		height: 40,
		backgroundColor: '#369',
		borderRadius: 10,
		marginTop: 10,
	},
	buttonDisabled: {
		backgroundColor: '#ddd',
	},
	buttonLabel: {
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 500,
		letterSpacing: 1.1,
		lineHeight: 40,
	},
	buttonLabelDisabled: {
		color: '#369',
	},
	linkText: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginBottom: 15,
		color: 'blue',
		fontSize: 20,
	},
})
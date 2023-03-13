import {
    Dimensions,
    StyleSheet,
} from 'react-native'

const windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
    text: {
        fontHeight: 20,
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
		// borderWidth: 1,
		// borderStyle: 'solid',
		// borderColor: 'red',
		margin: 15,
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
		backgroundColor: '#555',
		borderRadius: 10,
		marginVertical: 10,
	},
	buttonLabel: {
		color: '#fff',
		fontSize: 20,
		marginTop: 7,
		textAlign: 'center',
	},
	linkText: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginBottom: 15,
		color: 'blue',
		fontSize: 20,
	},
})
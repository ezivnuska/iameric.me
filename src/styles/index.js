import {
    Dimensions,
	Platform,
    StyleSheet,
} from 'react-native'

const windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
	screenContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
	},
    text: {
        fontSize: 16,
		lineHeight: 24,
    },
    heading: {
        fontSize: 20,
		fontWeight: 700,
		color: '#333',
		padding: 5,
    },
    email: {
        color: '#0000ff',
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: '#000',
        marginBottom: 15,
		// paddingHorizontal: 10,
    },
    formContainer: {
		// flex: 1,
        width: '100%',
		alignSelf: 'center',
		paddingVertical: 20,
		paddingHorizontal: 15,
		minWidth: 350,
        maxWidth: 450,
        width: '100%',
	},
	form: {
		// flex: 1,
		marginHorizontal: 'auto',
		width: '100%',
	},
	label: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
		marginBottom: 10,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginBottom: 10,
	},
	input: {
		flex: 1,
		flexGrow: 1,
		height: 40,
		color: '#000',
		paddingHorizontal: 10,
		fontSize: 18,
		lineHeight: 22,
		backgroundColor: '#fff',
		outlineWidth: 0,
		placeholderTextColor: '#999',
		backgroundColor: '#eee',
	},
	textArea: {
		height: 80,
		paddingVertical: 10,
		borderColor: '#ccc',
	},
	inputStatusIconContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		flexGrow: 0,
		flexBasis: 'auto',
	},
	inputStatusIconBackground: {
		padding: 3,
		width: 24,
		height: 24,
		borderRadius: 12,
		overflow: 'hidden',
	},
	inputStatusIcon: {
		color: '#fff',
        fontSize: 24,
	},
	rootError: {
		color: 'red',
	},
	button: {
		paddingHorizontal: 10,
		height: 40,
		backgroundColor: '#369',
		borderRadius: 10,
		marginVertical: 10,
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
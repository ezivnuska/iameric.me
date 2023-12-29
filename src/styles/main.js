import base from './base'
import layout from './layout'

export default {
	screenContainer: {
        flex: 1,
        width: '100%',
        // backgroundColor: '#fff',
	},
    text: {
        fontSize: base.textSize,
		lineHeight: base.textLineHeight,
		color: base.primaryTextColor,
    },
    padded: {
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding,
    },
    paddedV: {
		paddingVertical: layout.verticalPadding,
	},
	paddedH: {
		paddingHorizontal: layout.horizontalPadding,
    },
    heading: {
		marginBottom: 10,
        fontSize: base.headingSize,
		fontWeight: base.headingWeight,
		color: base.primaryTextColor,
		lineHeight: 30,
    },
    subheading: {
		fontSize: base.subheadingSize,
		fontWeight: base.subheadingWeight,
		color: base.secondaryTextColor,
		lineHeight: 20,
		marginBottom: 3,
    },
    email: {
        color: base.linkColor,
    },
    title: {
        fontSize: base.textSize,
        fontWeight: 700,
        color: base.primaryTextColor,
        marginBottom: 15,
		// paddingHorizontal: 10,
    },
    formContainer: {
		// flex: 1,
        width: '100%',
		alignSelf: 'center',
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
	form: {
		// borderWidth: 1,
		// borderColor: 'red',
		marginBottom: 20,
	},
	formColumns: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		columnGap: 10,
	},
	label: {
		fontSize: base.textSize,
		fontWeight: 600,
		color: base.primaryTextColor,
		marginBottom: 7,
	},
	inputContainer: {
		borderBottomWidth: 2,
		borderBottomColor: '#ccc',
		marginBottom: 10,
		paddingBottom: 2,

	},
	darkFormLabel: {
		// flex: 1,
		fontSize: base.textSize,
		fontWeight: 600,
		color: '#fff',
		marginBottom: 2,
		marginBottom: 7,
	},
	input: {
		flexBasis: 'auto',
		flexGrow: 1,
		flexShrink: 1,
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
		paddingHorizontal: 20,
		height: 40,
		backgroundColor: '#369',
		borderRadius: 10,
		marginBottom: 10,
	},
	// formSubmitButton: {
	// 	marginTop: 15,
	// },
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
}
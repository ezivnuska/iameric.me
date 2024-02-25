import sizes from './sizes'

export default {
    pageTitle: {
        marginVertical: 10,
        fontSize: sizes.headerPrimary,
        fontWeight: 700,
        lineHeight: sizes.headerPrimary + 4,
    },
    headerSecondary: {
        fontSize: sizes.headerSecondary,// 18
        fontWeight: 700,
        lineHeight: 22,
        // lineHeight: sizes.headerSecondary + 4,// 22
    },
    userTitle: {
        fontSize: sizes.userTitle,// 18
        fontWeight: 600,
        lineHeight: 20,
        marginBottom: 7,
        // lineHeight: sizes.headerSecondary + 4,// 22
    },
    productTitle: {
        fontSize: sizes.productTitle,// 22
        fontWeight: 600,
        lineHeight: 28,
    },
    productPrice: {
        fontSize: sizes.productPrice,// 22
        fontWeight: 600,
        lineHeight: 28,
    },
    productBlurb: {
        fontSize: sizes.productBlurb,
        fontWeight: 500,
        lineHeight: 20,
        paddingBottom: 10,
    },
    textDefault: {
        fontSize: sizes.textDefault,// 16
        fontWeight: 300,
        lineHeight: sizes.textDefault + 8,// 24
        letterSpacing: 0.5,
    },
    bold: {
        fontWeight: 600,
    },
    textSmaller: {
        fontSize: sizes.textSmaller,// 14
        fontWeight: 400,
        lineHeight: sizes.textDefault + 4,// 20
    },
    buttonText: {
        fontSize: sizes.textDefault - 2,// 16
        fontWeight: 600,
        lineHeight: sizes.textDefault + 6,// 22
        letterSpacing: 0.5,
    },
    userHeading: {
        fontSize: sizes.userTitle,
        fontWeight: 600,
        lineHeight: 32,
    },
    itemPrice: {
        textAlign: 'right',
        width: 72,
        paddingLeft: 10,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        letterSpacing: 1.1,// spaced to match higher weight total price
    },
    orderTotal: {
        textAlign: 'right',
        fontWeight: 600,
        width: 72,
        paddingLeft: 10,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
    },
    emergency: {
        fontSize: sizes.headerSecondary,// 18
        fontWeight: 700,
        lineHeight: sizes.headerSecondary + 4,// 22
        backgroundColor: '#f00',
        textAlign: 'center',
        paddingVertical: 7,
        marginBottom: 10,
    },
    calm: {
        fontSize: sizes.headerSecondary,// 18
        fontWeight: 700,
        lineHeight: sizes.headerSecondary + 4,// 22
        backgroundColor: '#00f',
        textAlign: 'center',
        paddingVertical: 7,
        marginBottom: 10,
    },
    formContainer: {
        width: '100%',
        minWidth: 300,
        maxWidth: 400,
        flexShrink: 1,
        flexGrow: 1,
        textAlign: 'left',
        // borderWidth: 1,
        // borderColor: 'yellow',
        marginHorizontal: 'auto',
        paddingBottom: 50,
	},
	formColumns: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		columnGap: 10,
	},
    formInputLabel: {
        marginTop: 5,
        marginBottom: 8,
        fontSize: sizes.formInputLabel,// 18
        fontWeight: 500,
        lineHeight: sizes.formInputLabel + 4,// 22
    },
	formInputContainer: {
		borderBottomWidth: 2,
		borderBottomColor: '#ccc',
		marginBottom: 10,
		paddingBottom: 2,

	},
    formInput: {
		flexBasis: 'auto',
		flexGrow: 1,
		flexShrink: 1,
		height: 40,
		paddingHorizontal: 10,
		fontSize: 18,
		lineHeight: 22,
		outlineWidth: 0,
        width: '100%',
        minWidth: 300,
	},
	formTextArea: {
        height: 80,
		paddingVertical: 8,
        lineHeight: 22,
	},
}
import sizes from './sizes'

export default {
    pageTitle: {
        marginVertical: 15,
        fontSize: sizes.headerPrimary,
        fontWeight: 700,
        lineHeight: sizes.headerPrimary + 4,
    },
    headerSecondary: {
        marginBottom: 5,
        fontSize: sizes.headerSecondary,// 18
        fontWeight: 700,
        lineHeight: sizes.headerSecondary + 4,// 22
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
}
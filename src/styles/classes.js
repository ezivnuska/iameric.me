import colors from './colors'
import sizes from './sizes'

export default {
    pageTitle: {
        marginBottom: 15,
        fontSize: sizes.headerPrimary,
        fontWeight: 700,
        lineHeight: sizes.headerPrimary + 4,
        color: colors.headerPrimary,
    },
    headerSecondary: {
        marginBottom: 5,
        fontSize: sizes.headerSecondary,// 18
        fontWeight: 700,
        lineHeight: sizes.headerSecondary + 4,// 22
        color: colors.headerSecondary,
    },
    textDefault: {
        fontSize: sizes.textDefault,// 16
        fontWeight: 300,
        lineHeight: sizes.textDefault + 8,// 24
        color: colors.textDefault,
        letterSpacing: 0.5,
    },
    bold: {
        fontWeight: 600,
    },
    textSmaller: {
        fontSize: sizes.textSmaller,// 14
        fontWeight: 400,
        lineHeight: sizes.textDefault + 4,// 20
        color: colors.textDefault,
    },
    buttonText: {
        fontSize: sizes.textDefault - 2,// 16
        fontWeight: 600,
        lineHeight: sizes.textDefault + 6,// 22
        color: colors.textDefault,
        letterSpacing: 0.5,
    },
    userHeading: {
        fontSize: sizes.userTitle,
        fontWeight: 600,
        lineHeight: 32,
        color: colors.userTitle,
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
        color: '#fff',
        backgroundColor: '#f00',
        textAlign: 'center',
        paddingVertical: 5,
        marginBottom: 10,
    },
    calm: {
        fontSize: sizes.headerSecondary,// 18
        fontWeight: 700,
        lineHeight: sizes.headerSecondary + 4,// 22
        color: '#00f',
        backgroundColor: '#aaf',
        textAlign: 'center',
        paddingVertical: 5,
        marginBottom: 10,
    },
}
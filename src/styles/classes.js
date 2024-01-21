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
        fontWeight: 700,
        lineHeight: 32,
        color: colors.userTitle,
    },
}